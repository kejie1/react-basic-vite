/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-14 11:37:18
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-18 18:12:36
 * @Description: 
 */
import { configureStore } from "@reduxjs/toolkit";
import countReducer from './modules/countStore'
import channelReducer from './modules/channelStore'
import meituanRefuce from './modules/meituanStore'
const store = configureStore({
  reducer:{
    count:countReducer,
    channel:channelReducer,
    meituan:meituanRefuce
  }
})

export default store