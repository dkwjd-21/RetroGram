import React from 'react';

const Sidebar = () => {
    const menus = [
        { icon: '🏠', name: '홈' },
        { icon: '🔍', name: '검색' },
        { icon: '✉️', name: '메시지' },
        { icon: '🔔', name: '알림' },
        { icon: '➕', name: '만들기' },
        { icon: '👤', name: '프로필' }
    ];

    return (
        <aside className="y2k-container" style={{ width: '220px', position: 'sticky', top: '20px' }}>
            <div className="window-header">Menu</div>
            <h2 className="y2k-title" style={{ fontSize: '1.2rem', margin: '10px 0' }}>Retro</h2>
            <div style={{ padding: '10px' }}>
                {menus.map((menu, index) => (
                    <p key={index} className="link-text" style={{ textAlign: 'left', marginTop: '5px' }}>
                        {menu.icon} {menu.name}
                    </p>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;