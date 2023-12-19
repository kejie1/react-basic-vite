/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-19 09:51:15
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-19 09:54:29
 * @Description: 
 */
import { LoginApp,QueryUserById } from "@/view/demo/router/Login";
import { ArticleApp } from "@/view/demo/router/Article";
import { GetUserInfoById,GetUserInfoByIdFroParams } from "@/view/demo/router/user/userInfo";
import { NestRoute,NestAdd,NestInfo,NestUpdate,NotFound } from "@/view/demo/router/Index";
import {createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path:'/login',
        element:<LoginApp />
    },
    {
        path:'/article',
        element:<ArticleApp />
    },
    {
        path:'/queryUser',
        element:<QueryUserById />
    },
    {
        path:'/userInfo',
        element:<GetUserInfoById />
    },
    // params传参配置
    {
        path:'/userInfo/:id/:name',
        element:<GetUserInfoByIdFroParams />
    },
    // 嵌套路由
    {
        path:'/index',
        element:<NestRoute />,
        children:[
            {
                index:true,
                // path:'info'
                element:<NestInfo />
            },
            {
                path:'add',
                element:<NestAdd />
            },
            {
                path:'update',
                element:<NestUpdate />
            },
        ]
    },
    {
        path:'*',
        element:<NotFound />
    }
])

export default router