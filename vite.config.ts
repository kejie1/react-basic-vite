/*
 * @Author: chuandonghuang 1950439317@qq.com
 * @Date: 2023-12-12 09:39:30
 * @LastEditors: chuandonghuang 1950439317@qq.com
 * @LastEditTime: 2023-12-15 10:40:59
 * @Description: 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {join} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@':join(__dirname,'src'),
    }
  }
})
