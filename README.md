# react-basic-vite

## 1.兄弟组件传值

```jsx
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
```

## 2.跨层组件传值

**步骤**

- 使用createContext创建上下文对象ctx
- 在顶层组件通过ctx.Provider组件提供数据
- 在地层组建使用useContext钩子获得数据

```jsx
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
export const ProVIderApp = ()=>{
    const message = 'this is provider message'
    return(<>
    <MessageProvider.Provider value={message}></MessageProvider.Provider>
        <Provider></Provider>
    </>)
}
```

### 3.useEffect

| 依赖项           | 运行机制                           |
| ---------------- | ---------------------------------- |
| 没有依赖项       | 组件初始预览，组件更新运行         |
| 空数组依赖项     | 只在初始化的时执行一次             |
| 添加特定的依赖项 | 组件初始预览加特定的依赖项变化执行 |

```jsx
const URL = ''
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
```

