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

## 3.useEffect

### 3.1 使用方式

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

### 3.2 一键清除副作用

### 3.3 副作用

在Euseffect中编写的由渲染本身引起的对接组件外部的操作，比如在Euseffect中开启的定时器，在组件卸载的时候需要清理掉，这个过程就是清理副作用

```jsx
export const clearEffect = ()=>{
    useEffect(()=>{
        // 副作用函数
        return ()=>{
            // 清除副作用逻辑
        }
    })
}
```

注：清除副作用最常见的时机是组件卸载时自动执行

### 3.4 实现

```jsx
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
```

## 4.自定义hook

## 5.redux

> npm install @reduxjs/toolkit react-redux

toolkit:工具集，简化书写方式

redux：连接redux和react的中间件

结构：

1.创建store目录

![image-20231218163854262](/home/hcd/.config/Typora/typora-user-images/image-20231218163854262.png)

2.创建modules目录，内部分类写子store

3.index文件作为store的入口文件，组合所有的子模块，并导出store

```jsx
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
```



store的使用

1.配置store(createSlice：业务分块)模块

```jsx
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

```

2.根store(configureStore)合并创建的Slice文件

```jsx
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
```

3.使用store数据

```jsx
const {count} = useSelector(state=>state.count)
const dispatch = useDispatch()
```

4.修改store数据(带参数)，使用action接收

```jsx
dispatch(reduceToNum(20)
```

5.异步请求

```jsx
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
```

```jsx
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
```

