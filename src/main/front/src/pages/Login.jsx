// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 추가
import '../styles/GlobalStyle.css';
import axios from 'axios';


const Login = () => { // 2. (setPage) 인자 제거
    const navigate = useNavigate(); // 3. navigate 함수 생성
    const [formData, setFormData] = useState({ userId: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("로그인 시도:", formData);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                userId: formData.userId,
                password: formData.password
            });

            if(response.status === 200) {
                alert("Retrogram에 오신 걸 환영합니다!");
                // 로그인 정보를 로컬 스토리지에 저장
                localStorage.setItem("user", response.data.userId);
                localStorage.setItem("userNum", response.data.userNum);
                window.location.href = "/main";
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data); // 서버가 보낸 에러 메시지
            } else {
                alert("서버와 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인하세요!");
            }
            console.error("로그인 에러 상세:", error);
        }

    };

    return (
        <div className="y2k-container">
            <h1 className="y2k-title">RetroGram</h1>
            <form onSubmit={handleLogin}>
                <input
                    className="y2k-input"
                    type="text"
                    name="userId"
                    placeholder="사용자명 또는 이메일"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                />
                <input
                    className="y2k-input"
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="y2k-button">로그인 (Click!)</button>
            </form>

            <p className="link-text" onClick={() => navigate('/signup')}> {/* 4. navigate로 변경 */}
                계정이 없으신가요? 회원가입 하러가기 →
            </p>
        </div>
    );
};

export default Login;