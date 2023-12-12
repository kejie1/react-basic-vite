/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-12 11:10:27
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-12 14:37:14
 * @Description: 
 */
// hook函数，用于在组件中不是由事件引起的而是由渲染本身引起的操作，一般用于DOM操作及发送请求
// useEffect依赖项
// 没有依赖项：组件初始预览，组件更新运行
// 空数组依赖项：只在初始化的时执行一次
// 添加特定的依赖项：组件初始预览加特定的依赖项变化执行
import { useEffect, useState } from "react"

const URL = 'https://adas-dreamer-test-api.human-horizons.com/cloud/getALlBuckets'
export const SendRequest = ()=>{
    const [allBUckets,setAllBUckets] = useState([])
    let [changeEffect,setChangeEffect] = useState(0)
    const [customAttr,setCustomAttr] = useState(0)
    useEffect(()=>{
        console.log('执行副作用函数！没有依赖项')
    })
    useEffect(()=>{
        const getALlBuckets = async ()=>{
            const res = await fetch(URL)
            const list = await res.json()
            setAllBUckets(list)
        }
        console.log('执行副作用函数！空数组依赖项')
        getALlBuckets()
    },[])
    useEffect(()=>{
        console.log('执行副作用函数！特定依赖项')
    },[customAttr])
    return (<>
        <div>
            <button onClick={()=>{setChangeEffect(changeEffect+1)}}>changeEffect{changeEffect}</button>
            <button onClick={()=>{setCustomAttr(customAttr+1)}}>customAttr{customAttr}</button>
            {/* {allBUckets.map(x=>(
                <span key={x}>{x}</span>
            ))} */}
        </div>
    </>)
}

export const ClearEffectSon = ()=>{
    useEffect(()=>{
        const timer = setInterval(()=>{console.log('定时器执行中'),1000})
        return ()=>{
            // 清除副作用逻辑
            clearInterval(timer)
        }
    },[])
    return(
        <>清除副作用</>
    )
}
export const ClearEffect = ()=>{
    const [isSHowElement,setIsSHowElement] = useState(true)
    return(
        <>
        <button onClick={()=>{setIsSHowElement(false)}}>setIsSHowElement</button>
        {isSHowElement && <ClearEffectSon />}
        </>
    )
}
