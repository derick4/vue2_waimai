// 1. 引入路由插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import VurRouter from 'vue-router'

// 2. 使用路由
Vue.use(VurRouter)

// 3. 引入路由组件
// 路由懒加载
const Msite = () => import('../pages/Msite/Msite')
const Search = () => import('../pages/Search/Search')
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')
const UserInfo = () => import('../pages/Profile/UserInfo')
const Login = () => import('../pages/Login/Login')
const Shop = () => import('../pages/Shop/Shop')
const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods')
const ShopRatings = () => import('../pages/Shop/ShopRatings/ShopRatings')
const Account = () => import('../pages/Account/Account')
const OrderInfo = () => import('../pages/Order/OrderInfo')



// 4. 配置路由规则并导出
const router = new VueRouter({
    mode: 'hash',
    routes: [
        // 路由重定向
        {
            path: '/',
            redirect: '/msite',

        },
        // 首页
        {
            path: '/msite',
            component: Msite,
            meta: {
                title: '外卖首页',
                // 显示底部导航栏
                isShowFooter: true
            }
        },
        // 商家信息
        {
            path: '/shop',
            component: Shop,
            meta: {
                isShowFooter: false,
                title: '店铺详情'
            },
            children: [
                {
                    path: '/shop/goods/:id',
                    component: ShopGoods,
                    meta: {
                        title: '食品列表'
                    }
                },
                {
                    path: '/shop/ratings/:id',
                    component: ShopRatings,
                    meta: {
                        title: '店铺评价'
                    }
                },
                {
                    path: '',
                    redirect: '/shop/goods'
                }
            ]
        },
        // 搜索
        {
            path: '/search',
            component: Search,
            meta: {
                title: '搜索页面',
                isShowFooter: true
            }
        },
        // 订单页面
        {
            path: '/order',
            component: Order,
            meta: {
                title: '订单页面',
                isShowFooter: true
            },
            children: [
                {
                    path: 'orderinfo/:order_id',
                    component: OrderInfo,
                    meta: {
                        isShowFooter: true,
                    }
                }
            ]
        },
        // 个人页面
        {
            path: '/profile',
            component: Profile,
            meta: {
                title: '个人中心',
                isShowFooter: true
            }
        },
        // 结算界面
        {
            path: '/account/:username',
            component: Account,
            meta: {
                isShowFooter: false,
            }
        },
        // 用户详情界面
        {
            path: '/userinfo/:username',
            component: UserInfo,
            meta: {
                title: '用户详情',
                isShowFooter: true
            }
        },
        // 登录页面
        {
            path: '/login',
            component: Login,
            meta: {
                title: '登录页面',
                isShowFooter: false,
            },
        }

    ]
})

// 全局后置路由守卫（一般用于修改网站标题）
router.afterEach((to, from) => {
    // 设置网站页面标题
    document.title = to.meta.title || '我的页面我做主'
})


// 导出
export default router