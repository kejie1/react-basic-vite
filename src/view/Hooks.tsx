/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-13 18:27:46
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-14 11:08:41
 * @Description: 
 */
import { useState } from "react"

export const HooksApp = ()=>{
    const  {isShow,handleIsShow} = useToggle()
    return (
        <>
            {isShow && <div>this is custom hook</div>}
            <button onClick={handleIsShow}>isSHow{isShow}</button>
        </>
    )
}
// 组件封装原则
// 1.智能组件负责数据获取
// 2.UI组件负责数据渲染
// hook使用规范
// 1.不允许在组件外使用(组件函数外)
// 2.不允许在if或for中使用(if、for结构体内)
// 封装hooks
// 1.声明use开头的函数
// 2.函数体内封装可服用逻辑
// 3.return组件中用到的状态中或回调
// 4.在组件中调用hook
function useToggle(){
    // 复用逻辑代码
    const [isShow,setIsShow] = useState(false)
    const handleIsShow = ()=>{
        setIsShow(!isShow)
    }
    // 需要使用的状态和回调函数return出去
    return {
        isShow,
        handleIsShow
    }
}