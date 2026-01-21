// src/pages/Main.jsx
import React from 'react';
import '../styles/GlobalStyle.css'; // 공통 CSS만 사용

const Main = () => {
    return (
        <div style={{ display: 'flex', padding: '20px', gap: '30px', alignItems: 'flex-start' }}>

            {/* 1. 왼쪽 고정 메뉴바 */}
            <aside className="y2k-container" style={{ width: '220px', position: 'sticky', top: '20px' }}>
                <div className="window-header">Menu</div>
                <h2 className="y2k-title" style={{ fontSize: '1.2rem', margin: '10px 0' }}>Retro</h2>
                <div style={{ padding: '10px' }}>
                    <p className="link-text" style={{ textAlign: 'left', marginTop: '5px' }}>🏠 홈</p>
                    <p className="link-text" style={{ textAlign: 'left', marginTop: '5px' }}>🔍 검색</p>
                    <p className="link-text" style={{ textAlign: 'left', marginTop: '5px' }}>✉️ 메시지</p>
                    <p className="link-text" style={{ textAlign: 'left', marginTop: '5px' }}>🔔 알림</p>
                    <p className="link-text" style={{ textAlign: 'left', marginTop: '5px' }}>➕ 만들기</p>
                    <p className="link-text" style={{ textAlign: 'left', marginTop: '5px' }}>👤 프로필</p>
                </div>
            </aside>

            {/* 2. 오른쪽 스크롤 피드 영역 */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>

                {/* 개별 피드 단위 (반복될 부분) */}
                <article className="y2k-container" style={{ width: '500px' }}>
                    {/* 피드 상단 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                                src="/sampleImg1.jpg"
                                alt="profile"
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                            />
                            <span style={{ fontWeight: 'bold' }}>hanr0r0</span>
                            <span style={{ fontSize: '0.8rem', color: '#808080' }}>• 1일 전</span>
                        </div>
                        <span style={{ cursor: 'pointer', padding: '0 5px' }}>•••</span>
                    </div>

                    {/* 피드 이미지 */}
                    <div style={{ width: '100%', height: '400px', background: 'white', borderTop: '2px solid black', borderBottom: '2px solid black' }}>
                        <img src="/sampleImg1.jpg" alt="feed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* 피드 하단 로직 */}
                    <div style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <button className="y2k-button" style={{ width: 'auto', padding: '5px 10px', margin: 0 }}>❤️ 12</button>
                            <button className="y2k-button" style={{ width: 'auto', padding: '5px 10px', margin: 0 }}>💬 5</button>
                        </div>
                        <div style={{ fontSize: '0.9rem' }}>
                            <span style={{ fontWeight: 'bold' }}>hanr0r0</span> 그곳의 나는 얼마만큼 울었는지 이곳의 나는 누구보다 잘 알기에 후회로 가득 채운 유리잔만 내려다보네
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#808080', marginTop: '8px' }}>2026. 01. 21</div>
                    </div>
                </article>

                <article className="y2k-container" style={{ width: '500px' }}>
                    {/* 피드 상단 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                                src="/sampleImg2.jpg"
                                alt="profile"
                                style={{
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                            />
                            <span style={{ fontWeight: 'bold' }}>teddybear</span>
                            <span style={{ fontSize: '0.8rem', color: '#808080' }}>• 1일 전</span>
                        </div>
                        <span style={{ cursor: 'pointer', padding: '0 5px' }}>•••</span>
                    </div>

                    {/* 피드 이미지 */}
                    <div style={{ width: '100%', height: '400px', background: 'white', borderTop: '2px solid black', borderBottom: '2px solid black' }}>
                        <img src="/sampleImg2.jpg" alt="feed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* 피드 하단 로직 */}
                    <div style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <button className="y2k-button" style={{ width: 'auto', padding: '5px 10px', margin: 0 }}>❤️ 6</button>
                            <button className="y2k-button" style={{ width: 'auto', padding: '5px 10px', margin: 0 }}>💬 1</button>
                        </div>
                        <div style={{ fontSize: '0.9rem' }}>
                            <span style={{ fontWeight: 'bold' }}>teddybear</span> 두쫀쿠 오픈런 실패...
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#808080', marginTop: '8px' }}>2026. 01. 21</div>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default Main;