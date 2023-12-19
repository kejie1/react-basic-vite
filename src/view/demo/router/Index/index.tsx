import { Link, Outlet } from "react-router-dom"
export const NestRoute = ()=>{
    return(
        <>
        this is NestRoute page
            <Link to='/index'>详情页</Link>
            <Link to='/index/add'>添加页</Link>
            <Link to='/index/update'>修改页</Link>
            <Link to='/user'>404页面</Link>
            {/* 二级路由出口 */}
            <Outlet />
        </>
    )
}
export const NestInfo = ()=>{
    return(
        <>
            this is info page
        </>
    )
}
export const NestAdd = ()=>{
    return(
        <>
            this is add page
        </>
    )
}
export const NestUpdate = ()=>{
    return(
        <>
            this is update page
        </>
    )
}
export const NotFound = ()=>{
    return(<>
        this is 404 page
    </>)
}