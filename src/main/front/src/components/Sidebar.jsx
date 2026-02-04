import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ openModal, setView, view, onProfileClick }) => {
    const navigate = useNavigate();

    const menus = [
        { icon: '🏠', name: '홈', action: 'setHome' },
        { icon: '🔍', name: '검색', path: '#' },
        { icon: '✉️', name: '메시지', path: '#' },
        { icon: '🔔', name: '알림', path: '#' },
        { icon: '➕', name: '만들기', action: 'openModal' },
        { icon: '👤', name: '프로필', action: 'setProfile' }
    ];

    const handleHomeClick = () => {
        if (window.location.pathname === '/main') {
            window.location.href = '/main'; // 같은 경로면 강제 새로고침
        } else {
            navigate('/main');
        }
    };

    return (
        <aside className="y2k-container" style={{ width: '220px', position: 'sticky', top: '20px' }}>
            <div className="window-header">Menu</div>
            <h2 className="y2k-title" style={{ fontSize: '1.2rem', margin: '10px 0' }}>Retro</h2>
            <div style={{ padding: '10px' }}>
                {menus.map((menu, index) => (
                    <p
                        key={index}
                        className="link-text"
                        style={{ textAlign: 'left', marginTop: '5px', cursor: 'pointer' }}
                        onClick={() => {
                            // 메뉴별 액션 분기 처리
                            if (menu.action === 'openModal') {
                                openModal();
                            } else if (menu.action === 'setHome') {
                                // 현재 뷰가 이미 home이라면 새로고침, 아니면 뷰 전환
                                if (view === 'home') {
                                    window.location.reload();
                                } else {
                                    setView('home');
                                }
                            } else if (menu.action === 'setProfile') {
                                setView('profile');
                                onProfileClick();
                            } else {
                                navigate(menu.path);
                            }
                        }}
                    >
                        {menu.icon} {menu.name}
                    </p>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;