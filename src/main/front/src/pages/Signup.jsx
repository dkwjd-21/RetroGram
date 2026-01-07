// src/pages/Signup.jsx
import React, { useState } from 'react';
import '../styles/GlobalStyle.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate(); // 추가
    const [formData, setFormData] = useState({
        email: '', userId: '', password: '', confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("비밀번호가 일치하지 않아요! ㅠ_ㅠ");
            return;
        }
        alert("회원가입 완료! 로그인을 해주세요.");
        navigate('/login'); // 회원가입 후 로그인 페이지로 이동
    };

    return (
        <div className="y2k-container">
            <div className="y2k-header-group">
                <h1 className="y2k-title" style={{ marginBottom: '5px'}}>Join Us!</h1>
                <p className="y2k-subtitle">친구들의 사진을 보려면 가입하세요 ♪</p>
            </div>

            <form onSubmit={handleSignup}>
                <input
                    className="y2k-input"
                    type="email"
                    name="email"
                    placeholder="이메일 주소"
                    onChange={handleChange}
                    required
                />
                <input
                    className="y2k-input"
                    type="text"
                    name="userId"
                    placeholder="사용자 아이디"
                    onChange={handleChange}
                    required
                />
                <input
                    className="y2k-input"
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    onChange={handleChange}
                    required
                />
                <input
                    className="y2k-input"
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호 확인"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="y2k-button">
                    가입하기 (Click!)
                </button>
            </form>

            <p className="link-text" onClick={() => navigate('/login')}>
                이미 계정이 있나요? 로그인하기
            </p>
        </div>
    );
};

export default Signup;