import React from 'react';

const Profile = ({ feeds, userInfo, onEditClick }) => {
    // 현재 로그인한 유저 ID (버튼 분기용)
    const loginUser = localStorage.getItem("user");
    const isMe = loginUser === userInfo?.userId;
    const userFeeds = feeds.filter(f => f.userId === userInfo?.userId); // 해당 프로필 주인의 게시물만 필터링

    // 데이터 로딩 중 예외 처리
    if (!userInfo) return <div className="y2k-container">Loading...</div>;

    return (
        <div className="y2k-container" style={{ width: '500px', height: '700px', display: 'flex', flexDirection: 'column' }}>

            <div className="window-header">
                {/* 타이틀바 문구 동적 변경 */}
                <span>{isMe ? "My Profile" : `${userInfo.userId}'s Profile`}</span>
            </div>

            <header style={{
                display: 'flex',
                gap: '20px',
                padding: '15px',
                flexShrink: 0,
                marginBottom: '10px'
            }}>
                <div style={{
                    width: '90px',
                    height: '90px',
                    backgroundColor: 'white',
                    border: '2px solid var(--win-black)',
                    borderRadius: '50%',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    flexShrink: 0
                }}>
                    <img
                        src={userInfo.imgUrl || "/sampleImg1.jpg"}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        alt="profile"
                    />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        {userInfo.isPrivate === true && <span title="비공개 계정" style={{ fontSize: '1.1rem' }}>🔒</span>}
                        <h2 style={{ margin: 0, fontSize: '1.3rem' }}>{userInfo.userId}</h2>

                        {/* 내 프로필이면 '편집', 남의 프로필이면 '팔로우' 버튼 표시 */}
                        {isMe ? (
                            <button className="y2k-button"
                                    style={{ width: 'auto', margin: '0 0 0 5px', padding: '3px 8px', fontSize: '0.75rem' }}
                                    onClick={onEditClick}>
                                편집
                            </button>
                        ) : (
                            <button className="y2k-button" style={{
                                width: 'auto',
                                margin: '0 0 0 5px',
                                padding: '3px 8px',
                                fontSize: '0.75rem',
                                background: 'var(--pastel-blue)' // 남의 프로필일 때 포인트 컬러
                            }}>팔로우</button>
                        )}
                    </div>

                    <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#333', lineHeight: '1.2' }}>
                        {userInfo.bio || "소개글이 없습니다."}
                    </p>

                    <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem' }}>
                        <p style={{ margin: 0 }}>게시물 <span style={{ color: 'var(--hot-pink)', fontWeight: 'bold' }}>{userFeeds.length}</span></p>
                        <p style={{ margin: 0 }}>팔로워 <span>128</span></p>
                        <p style={{ margin: 0 }}>팔로잉 <span>256</span></p>
                    </div>
                </div>
            </header>

            <div className="y2k-input" style={{
                flex: 1,
                margin: '10px',
                overflowY: 'auto',
                background: 'white',
                padding: '10px'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '5px'
                }}>
                    {userFeeds.length > 0 ? userFeeds.map(feed => (
                        <div key={feed.id} style={{
                            aspectRatio: '1/1',
                            border: '1px solid var(--win-gray-dark)',
                            cursor: 'pointer',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={feed.images?.[0]?.imageUrl || '/sampleImg1.jpg'}
                                alt="user-post"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    )) : (
                        <div style={{ gridColumn: '1 / span 3', textAlign: 'center', padding: '40px 0', color: 'var(--win-gray-dark)' }}>
                            게시물이 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;