/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-18 17:30:09
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-18 18:13:25
 * @Description: 
 */
import './index.scss'


import {NavBar} from './NavBar'
import {Menu} from './Menu'
import {Cart} from './Cart'
import {FoodsCategory} from './FoodsCategory'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchGoodsList } from '@/store/modules/meituanStore'

export const MeiTuan = () => {
  const {foodsList} = useSelector(state=>state.meituan)
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
          <Menu list={foodsList}/>
          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {foodsList?.map(item => {
                return (
                  <FoodsCategory
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
