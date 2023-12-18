/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-14 11:37:18
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-15 11:26:02
 * @Description: 
 */
import { configureStore } from "@reduxjs/toolkit";
import countReducer from './modules/countStore'
import channelReducer from './modules/channelStore'
const store = configureStore({
  reducer:{
    count:countReducer,
    channel:channelReducer
  }
})

export default store