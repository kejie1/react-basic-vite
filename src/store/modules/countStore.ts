/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-15 09:32:40
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-15 11:04:48
 * @Description: 
 */
import { createSlice } from "@reduxjs/toolkit";


const countSLice = createSlice({
    name:'count',
    // 初始化状态
    initialState: {
        count:0
    },
    // 修改数据的方法
    reducers:{
        increment(state:{ count: number}){
            state.count++
        },
        decrement(state:{ count: number}){
            state.count--
        },
        addToNum(state:{ count: number},action:{payload?:number}){
            if(action.payload)state.count += action.payload
            else state.count++
        },
        reduceToNum(state:{ count: number}, action:{payload?:number}){
            if(action.payload)state.count -= action.payload
            else state.count--
        },
    }
})
// 结构出来action函数
const {increment,decrement,addToNum,reduceToNum} = countSLice.actions
// 结构出来的reducer函数
const reducer = countSLice.reducer

export {increment,decrement,addToNum,reduceToNum}
export default reducer
