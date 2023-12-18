import { createSlice,Dispatch } from "@reduxjs/toolkit";

const chanelSlice = createSlice({
    name:'chanel',
    initialState:{
        channelList:[]
    },
    reducers:{
        setFetchData(state:any,action:any){
            console.log('payload',action.payload)
            state.channelList = action.payload
        }
    }
}) 
const {setFetchData} = chanelSlice.actions
// 单独封装函数在函数中return一个一部请求
const getList = ()=>{
    return async (dispatch:Dispatch)=>{
        const res = await fetch('https://adas-dreamer-test-api.human-horizons.com/cloud/getALlBuckets')
        const list = await res.json()
        console.log('list',list)
        dispatch(setFetchData(list.data))
    }
}
const reducer = chanelSlice.reducer

export { getList }
export default reducer