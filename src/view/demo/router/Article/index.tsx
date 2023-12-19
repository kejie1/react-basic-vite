/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-19 09:49:10
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-19 10:25:31
 * @Description: 
 */
import {useNavigate} from 'react-router-dom'
export const ArticleApp = ()=>{
    const navigate = useNavigate()
    return (<>
        this is login ArticleApp
        {/* 编程式导航 */}
        <button onClick={()=>{navigate('/login')}}>跳转登陆</button>
    </>)
}
