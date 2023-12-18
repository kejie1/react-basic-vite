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

4.mian中注入Provider组件并且传递store

```jsx
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './store/index.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
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

## 6.美团项目

### 6.1创建依赖的slice

```tsx
/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-18 17:08:11
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-18 18:11:58
 * @Description:
 */
import { Foods } from "@/view/demo/meituan/components/FoodsCategory/FoodItem";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface Takeaway {
  tag: string;
  name: string;
  foods: Food[];
}

interface Food {
  id: number;
  name: string;
  like_ratio_desc: string;
  month_saled: number;
  unit: string;
  food_tag_list: string[][];
  price: number;
  picture: string;
  description: string;
  tag: string;
  count: number;
}
const meiTuanSlice = createSlice({
  name: "meituan",
  initialState: {
    foodsList: [], // 商品列表
    currentIndex: 0, // 当前下标
    carList: [], // 购物车列表
  },
  reducers: {
    // 商品列表
    setGoodsList(state: { foodsList: Takeaway[] }, action: { payload: any }) {
      state.foodsList = action.payload;
    },
    // 当前选中的分类
    setCurrentIndex(
      state: { currentIndex: number },
      action: { payload: number }
    ) {
      state.currentIndex = action.payload;
    },
    // 购物车
    setCarlist(state: { carList: Food[] }, action: { payload: any }) {
      let item = state.carList.find((x) => x.id === action.payload.id);
      if (item) {
        item.count<10 && item.count++
      } else {
        state.carList = [...state.carList,action.payload]
      }
    },
    // 增加数量
    increCounte(state: { carList: Food[] }, action: { payload: any }){
        let item = state.carList.find((x) => x.id === action.payload.id);
        if(item && item.count<10) item.count++
    },
    decreCounte(state: { carList: Food[] }, action: { payload: any }){
        let item = state.carList.find((x) => x.id === action.payload.id);
        if(item && item.count>0) {
            item.count--
        }
        if(item?.count === 0){
            state.carList = state.carList.filter(x=>x.count!==0)
        }
    },
    // 清除购物车
    clearCarList(state: { carList: Food[] }){
        state.carList = []
    }
  },
});

const { setGoodsList, setCurrentIndex, setCarlist,increCounte,decreCounte,clearCarList } = meiTuanSlice.actions;

const fetchGoodsList = () => {
  return async (dispatch: Dispatch) => {
    const res = await axios.get("http://localhost:3004/takeaway");
    dispatch(setGoodsList(res.data));
  };
};
export default meiTuanSlice.reducer;
export { fetchGoodsList, setCurrentIndex, setCarlist,increCounte,decreCounte,clearCarList };

```

### 6.2在index入口合并

```tsx
import { configureStore } from "@reduxjs/toolkit";
import countReducer from './modules/countStore'
import channelReducer from './modules/channelStore'
import meituanRefuce from './modules/meituanStore'
const store = configureStore({
  reducer:{
    count:countReducer,
    channel:channelReducer,
    meituan:meituanRefuce
  }
})

export default store
```

### 6.3主页渲染

```tsx
import './index.scss'


import {NavBar} from './NavBar'
import {Menu} from './Menu'
import {Cart} from './Cart'
import {FoodsCategory} from './FoodsCategory'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchGoodsList } from '@/store/modules/meituanStore'

export const MeiTuan = () => {
  const {foodsList,currentIndex} = useSelector(state=>state.meituan)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchGoodsList())
  },[dispatch])
  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />
      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu />
          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {foodsList?.map((item,index) => {
                return (
                  index === currentIndex &&  <FoodsCategory
                    key={item.tag}
                    // 列表标题
                    name={item.name}
                    // 列表商品
                    foods={item.foods}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 购物车 */}
      <Cart />
    </div>
  )
}

export default NavBar
```

### 6.4 分类

```tsx
import { useDispatch } from 'react-redux'
import './index.scss'
import { setCarlist } from '@/store/modules/meituanStore'
export const Foods = ({
  id,
  picture,
  name,
  unit,
  description,
  food_tag_list,
  month_saled,
  like_ratio_desc,
  price,
  tag,
  count
}) => {
const dispatch = useDispatch()
  return (
    <dd className="cate-goods">
      <div className="goods-img-wrap">
        <img src={picture} alt="" className="goods-img" />
      </div>
      <div className="goods-info">
        <div className="goods-desc">
          <div className="goods-title">{name}</div>
          <div className="goods-detail">
            <div className="goods-unit">{unit}</div>
            <div className="goods-detail-text">{description}</div>
          </div>
          <div className="goods-tag">{food_tag_list.join(' ')}</div>
          <div className="goods-sales-volume">
            <span className="goods-num">月售{month_saled}</span>
            <span className="goods-num">{like_ratio_desc}</span>
          </div>
        </div>
        <div className="goods-price-count">
          <div className="goods-price">
            <span className="goods-price-unit">¥</span>
            {price}
          </div>
          <div className="goods-count">
            <span className="plus" onClick={()=>{dispatch(setCarlist({
  id,
  picture,
  name,
  unit,
  description,
  food_tag_list,
  month_saled,
  like_ratio_desc,
  price,
  tag,
  count
}))}}></span>
          </div>
        </div>
      </div>
    </dd>
  )
}
```

### 6.5 购物车

```tsx
import classNames from 'classnames'
import {Count} from '../Count'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { increCounte,decreCounte,clearCarList } from '@/store/modules/meituanStore'
import { useState } from 'react'
export const Cart = () => {
  const {carList} = useSelector(state=>state.meituan)
  const allPrice = carList.reduce((a,c)=>a+c.price*c.count,0)
  const dispatch = useDispatch()
  const [isShow,setIsShow] = useState(false)
  const onShow=()=>{
    if(carList.length>0){
      setIsShow(true)
    }
  }
  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div
        className={classNames('cartOverlay',isShow&&'visible')}
        onClick={()=>setIsShow(false)}
      />
      <div className="cart">
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div onClick={onShow} className={classNames('icon',carList.length > 0 && 'fill')}>
          {carList.length > 0 && <div className="cartCornerMark">{carList.length}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {allPrice.toFixed(2)}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {allPrice > 20 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel',isShow &&'visible')}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={()=>{dispatch(clearCarList())}}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {carList.map((item:any,index:number) => {
            return (
              <div className="cartItem" key={index}>
                <img className="shopPic" src={item?.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item?.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item?.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    count={item?.count}
                    onPlus={()=>{dispatch(increCounte(item))}}
                    onMinus={()=>{dispatch(decreCounte(item))}}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

6.4修复bug

```tsx
decreCounte(state: { carList: Food[] }, action: { payload: any }){
        let item = state.carList.find((x) => x.id === action.payload.id);
        if(item && item.count>0) {
            item.count--
        }
    	// 当购物车中某项为0是更新购物车状态
        if(item?.count === 0){
            state.carList = state.carList.filter(x=>x.count!==0)
        }
    },
```

```tsx
setCarlist(state: { carList: Food[] }, action: { payload: any }) {
      let item = state.carList.find((x) => x.id === action.payload.id);
      if (item) {
      	// 在列表项添加时购物车该项的数量不能大于10
        item.count<10 && item.count++
      } else {
        state.carList = [...state.carList,action.payload]
      }
    },
```

