import { useParams, useSearchParams,Link } from "react-router-dom"

export const GetUserInfoById = ()=>{
    // 通过useSearchParams获取参数
    const [params] = useSearchParams()
    let id = params.get('id')
    let name = params.get('name')
   return(<>
   this is userInfo page
   searchParams传过来的参数id:{id},name:{name}
   </>)
}
export const GetUserInfoByIdFroParams = ()=>{
    // 通过Params获取参数
    const params = useParams()
    let typeId = params.id
    let name = params.name
   return(<>
   this is userInfo page
   params传过来的参数id:{typeId},name:{name}
   </>)
}