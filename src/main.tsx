import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './store/index.js'
import { Provider } from 'react-redux'
import { RouterProvider} from 'react-router-dom'

//倒入路由组件
import router from '@/route/index'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* 路由绑定 */}
    <RouterProvider router={router}/>
  </Provider>
)
