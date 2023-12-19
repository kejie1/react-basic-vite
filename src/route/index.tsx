/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-19 09:51:15
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-19 09:54:29
 * @Description: 
 */
import { LoginApp } from "@/view/demo/router/Login";
import { ArticleApp } from "@/view/demo/router/Article";
import {createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path:'/login',
        element:<LoginApp />
    },
    {
        path:'/article',
        element:<ArticleApp />
    }
])

export default router