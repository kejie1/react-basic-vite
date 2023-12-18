/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-18 17:29:01
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-18 17:42:04
 * @Description: 
 */
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
