// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styles/GlobalStyle.css';

// 라우팅 설정
function App() {
  return (
      <Router>
        {/* Routes는 여러 Route 중 현재 경로와 일치하는 하나만 렌더링한다.
        Y2K 감성을 위해 전체를 감싸는 레이아웃 스타일을 적용할 수도 있다.
      */}
        <Routes>
          {/* 기본 경로(/) 접속 시 로그인 페이지로 이동 */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />

          {/* 회원가입 페이지 */}
          <Route path="/signup" element={<Signup />} />

          {/* 404 페이지 처리 (잘못된 경로 접근 시 로그인으로 리다이렉트) */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;