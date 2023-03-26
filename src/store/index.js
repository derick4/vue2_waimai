/*
vuex核心管理模块store对象
 */
import Vue from 'vue'
import Vuex from 'vuex'

import {shoplists, getUserCookie, clearCookie} from '@/api/index.js'

const state = {
    shoplists: [], // 商家列表
    username: '', // 登录或注册的用户名
    cartFoods: [], // 保存用户加购物车的食品
    fee: 0, // 商家配送费
    shopId: '', // 商家id(评价用)
}

const actions = {
    // 获取商家列表
    async getShops({commit}) {
        let res = await shoplists()
        commit('GET_SHOPS', res)
    },
    // 获取cookie
    async getCookie({commit}) {
        let {msg} = await getUserCookie()
        commit('GET_COOKIE', msg)
    },
    // 退出登录
    async logout({commit}) {
        let res = await clearCookie()
        if (res.msg === 0) {
            commit('LOGOUT')
        }
    },
    // 购物车操作
    doupdate({commit}, {isAdd, food}) {
        // console.log(isAdd,food)
        if (isAdd) {
            commit('ADD', food)
        } else {
            commit('MINUS', food)
        }
    },
    // 清空购物车
    clearCart({commit}) {
        commit('CLEARCART')
    }
}

const mutations = {
    // 更新商家列表
    GET_SHOPS(state, o) {
        state.shoplists = o
    },
    // 更新用户名
    getUsername(state, name) {
        state.username = name
    },
    // 持久化存储
    GET_COOKIE(state, name) {
        state.username = name
    },
    // 退出登录
    LOGOUT(state) {
        state.username = ''
    },
    // 添加食品
    ADD(state, food) {
        // console.log(food)
        if (!food.count) {
            // 响应式数据
            Vue.set(food, 'count', 1)
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    // 减少
    MINUS(state, food) {
        // console.log(food)
        if (food.count) {
            food.count--
            if(food.count === 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    // 清空购物车
    CLEARCART(state) {
        state.cartFoods.forEach(item => item.count = 0)
        state.cartFoods = []
    },
    // 配送费
    getFee(state, fee) {
        state.fee = fee
    },
    // 获取商家id
    getShopId(state, shop_id) {
        state.shopId = shop_id
    }
}

const getters = {
    // 获取购物车数量
    getTotalCount() {
        return state.cartFoods.reduce((initTotal, food) => initTotal + food.count, 0)
    },
    // 获取购物车商品总价格
    getTotalPrice() {
        return state.cartFoods.reduce((initTotalPrice, food) => initTotalPrice + food.price * food.count, 0)
    }
}

//使用vuex
Vue.use(Vuex)
//配置并导出
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})