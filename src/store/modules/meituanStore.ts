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
