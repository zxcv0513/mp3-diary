import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 프록시: 프론트(5173)로 온 /api 요청을 백엔드(8080)로 대신 전달해줘요.
    //
    // 왜 필요할까?
    //   브라우저는 보안 때문에 "다른 주소(포트가 달라도 다른 주소!)"로 보내는 요청을 막아요. (CORS)
    //   프록시를 쓰면 브라우저 입장에서는 같은 주소(5173)에 요청하는 거라 막히지 않아요.
    //
    //   브라우저 → localhost:5173/api/diaries → (Vite 가 대신 전달) → localhost:8080/api/diaries
    //
    // ※ 개발 서버(npm run dev)에서만 동작해요. 배포할 때는 따로 설정이 필요해요.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
