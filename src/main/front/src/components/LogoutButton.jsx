import React from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            // 로컬스토리지 정보 삭제
            localStorage.removeItem("user");
            // 로그인 페이지로 리다이렉트 (새로고침 효과 포함)
            window.location.href = "/";
        }
    };

    return (
        <button
            className="y2k-button"
            onClick={handleLogout}
            style={{
                width: '100%',     // 부모 컨테이너(220px)에 맞춤
                marginTop: '15px',
                padding: '10px 15px',
                color: '#ff0000',  // 강렬한 빨간색
                fontWeight: 'bold',
                textAlign: 'left', // 사이드바 메뉴와 통일감
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '10px 10px 0px rgba(0, 0, 0, 0.2)'
            }}
        >
            <span>🏃</span> Logout
        </button>
    );
};

export default LogoutButton;