import { useState,createContext, useContext } from "react"
export const ChildA = ({onGetMessage})=>{
    const message = 'this is ChildA'
    return(<>
        <button onClick={()=>{onGetMessage(message)}}>send</button>
    </>)
}
export const ChildB = ({message})=>{
    return(<>
       <h5>获取消息:{message}</h5>
    </>)
}
// 兄弟组建传值
export const BrotherApp = ()=>{
    const [message,setMessage] = useState('')
    const getMessage = (message:string)=>{
        setMessage(message)
    }
    return(<>
        <ChildA onGetMessage={getMessage}></ChildA>
        <ChildB message={message}></ChildB>
    </>)
}

const MessageProvider = createContext('message')
export const Provider = ()=>{
    return(<>
        this is child 
        <ProviderChid></ProviderChid>
    </>)
}
export const ProviderChid = ()=>{
    const rootMsg = useContext(MessageProvider)
    return(<>
        this is child child 
        {rootMsg} is send by Root
    </>)
}
// 跨层传递值
// 1.使用createContext创建上下文对象ctx
// 2.在顶层组件通过ctx.Provider组件提供数据
// 3.在地层组建使用useContext钩子获得数据
export const ProVIderApp = ()=>{
    const message = 'this is provider message'
    return(<>
    <MessageProvider.Provider value={message}></MessageProvider.Provider>
        <Provider></Provider>
    </>)
}