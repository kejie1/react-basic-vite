import { Link, useNavigate } from 'react-router-dom'
export const LoginApp = ()=>{
    return (<>
        this is login page
        {/* 声明式导航 */}
        <Link to='/article'>跳转文章页</Link>
    </>)
}
export const QueryUserById = ()=>{
    const navigate = useNavigate()
    return(<>
        <button onClick={()=>{navigate('/userInfo?id=10&&name=Tom')}}>searchParams传参</button>
        <button onClick={()=>navigate('/userInfo/10001')}>params传参</button>
    </>)
}
