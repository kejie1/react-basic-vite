/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-18 17:08:11
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-18 18:11:58
 * @Description: 
 */
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const meituanSlice = createSlice({
    name:'meituan',
    initialState:{
        foodsList:[]
    },
    reducers:{
        setGoodsList(state:{ foodsList: never[]; }, action:{ payload: any}):void{
            state.foodsList = action.payload
        }
    }
})

const {setGoodsList} = meituanSlice.actions

const fetchGoodsList = ()=>{
    return async(dispatch)=>{
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setGoodsList(res.data))
    }
}
export default meituanSlice.reducer
export { fetchGoodsList}

