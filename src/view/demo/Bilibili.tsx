/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-14 10:21:55
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-15 11:44:32
 * @Description: 
 */
import { useEffect, useState } from "react"

const useGetObsKey = ()=>{
    const [obsKeyList,setObsKeyList] = useState()
    useEffect(()=>{
        const getObsList = async ()=>{
            const res = await fetch('https://adas-dreamer-test-api.human-horizons.com/cloud/getALlBuckets')
            const list = await res.json()
            setObsKeyList(list.data)
        }
        getObsList()
    },[])
    
    return {obsKeyList,setObsKeyList}
}


export const BiliBiliApp = ()=>{
    const {obsKeyList,setObsKeyList} = useGetObsKey()
    return (
    <ul>
    {
        obsKeyList?.map(x=>(
            <li key={x}>{x}</li>
        ))
    }
    </ul>
        
    )
}