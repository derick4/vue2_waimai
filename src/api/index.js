import ajax from './ajax'
//获取商家列表
const BASE_URL="./api";
// 获取商家列表
export const shoplists = () => ajax(`${BASE_URL}/admin/shoplists`)
// 注册
export const doregistor = (name, pass) => ajax(`${BASE_URL}/admin/registeruser`, {name, pass}, 'GET')
// 登录
export const dologin = (name, pass) => ajax(`${BASE_URL}/admin/loginuser`, {name, pass}, 'POST')
// 获取 cookie
export const getUserCookie = () => ajax(`${BASE_URL}/admin/userinfos`, 'GET')
// 清空 cookie
export const clearCookie = () => ajax(`${BASE_URL}/admin/vuelogout`, 'GET')
// 获取单个商家信息
export const getShoplistone = (id) => ajax(`${BASE_URL}/admin/shoplistone`,{id}, 'GET')
// 获取食品信息
export const getGoods = (id) => ajax(`${BASE_URL}/admin/shopgoods`,{id}, 'GET')
// 获取评价信息
export const getComments = (id) => ajax(`${BASE_URL}/admin/comments`,{id}, 'GET')
// 添加地址
export const AddAddress = (realname,phone,address,username) => ajax(`${BASE_URL}/admin/addaddress`, {realname,phone,address,username}, 'POST')
// 获取用户的所有收货地址
export const getAddAddress = (username) => ajax(`${BASE_URL}/admin/getalladdress`, {username}, 'GET')
// 生成订单
export const AddOrder = (order_num,address_id,food_totalprice,username,shop_id) => ajax(`${BASE_URL}/admin/addorder`, {order_num,address_id,food_totalprice,username,shop_id}, 'POST')
// 生成订单详情
export const AddOrderGoods = (foodname,pic,count,orders_id) => ajax(`${BASE_URL}/admin/addordergoods`, {foodname,pic,count,orders_id}, 'POST')
// 搜索商家
export const getShopname = (shopname) => ajax(`${BASE_URL}/admin/search`, {shopname}, 'GET')
// 搜索商家
export const getUserOrders = (username) => ajax(`${BASE_URL}/admin/userorders`, {username}, 'GET')
// 获取订单详情
export const getOrderInfo = (order_id) => ajax(`${BASE_URL}/admin/userorderid`, {order_id}, 'GET')
// 获取用户详情
export const getUserInfo = (name) => ajax(`${BASE_URL}/admin/usermessage`, {name}, 'GET')
// 添加用户信息
export const insertUserInfo = (realname, phone, email, username) => ajax(`${BASE_URL}/admin/insertuserinfo`, {realname, phone, email, username}, 'POST')
// 更新用户信息
export const updateUserInfo = (realname, phone, email, username) => ajax(`${BASE_URL}/admin/updateuserinfo`, {realname, phone, email, username}, 'POST')
// 更新用户头像
export const updateUserPic = (headerpic,username) => ajax(`${BASE_URL}/admin/updateuserpic`, {headerpic,username}, 'POST')
// 添加用户评论
export const addUserComments = (comments_user,content,shop_id,time,user_pic) => ajax(`${BASE_URL}/admin/addcomments`, {comments_user,content,shop_id,time,user_pic}, 'POST')
