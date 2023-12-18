/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-15 10:01:09
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-18 16:33:41
 * @Description: 
 */

// 使用useSelector把store的数据映射到组件中
import { useSelector } from "react-redux"
// 修改store值的hook,用于提交action对象
import { useDispatch } from "react-redux"
import { increment,decrement,addToNum,reduceToNum } from "@/store/modules/countStore"
import {getList} from '@/store/modules/channelStore'
import { useEffect } from "react"
const Sync = ()=>{
    const {count} = useSelector(state=>state.count)
    const dispatch = useDispatch()
    return(<>
    <h5>{count}</h5>
    <button onClick={()=>dispatch(increment())}>++</button>
    <button onClick={()=>dispatch(decrement())}>--</button>
    <button onClick={()=>dispatch(addToNum(10))}>+10</button>
    <button onClick={()=>dispatch(reduceToNum(20))}>-20</button>
    </>)
}
const AsyncComponent = ()=>{
    const {channelList} = useSelector(state=>state.channel)
    const dispatch = useDispatch()
    useEffect(()=>{dispatch(getList())},[dispatch])
    
    return (<>
        <ul>
            {channelList?.map(x=>(
                <span key={x}>{x}</span>
            ))}
        </ul>
    </>)
}
export const ReduxApp = ()=>{
    
    return(<>
    <Sync />
    <AsyncComponent />
    </>)
}