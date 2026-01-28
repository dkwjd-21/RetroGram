import React from 'react';

const FeedItem = ({ feed }) => {
    // 메인 이미지 경로 결정 (이미지 배열이 비어있을 경우 대비)
    const mainImage = feed.images && feed.images.length > 0
        ? feed.images[0].imageUrl
        : '/sampleImg1.jpg';

    // 날짜 형식 변환
    const formattedDate = feed.uploadTime
        ? new Date(feed.uploadTime).toLocaleDateString('ko-KR')
        : '일자 정보 없음';

    // 상대 시간을 계산하는 함수
    const getRelativeTime = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMs = now - past; // 밀리초 단위 차이

        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMinutes < 1) return '방금 전';
        if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
        if (diffInHours < 24) return `${diffInHours}시간 전`;
        if (diffInDays < 7) return `${diffInDays}일 전`;

        // 7일 이상 지나면 날짜를 그대로 표시
        return past.toLocaleDateString('ko-KR');
    };

    const displayTime = feed.uploadTime
        ? getRelativeTime(feed.uploadTime)
        : '시간 정보 없음';

    return (
        <article className="y2k-container" style={{ width: '500px' }}>
            {/* 상단 정보 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                        src="/sampleImg1.jpg" // 프로필 필드가 아직 없으므로 고정 이미지 사용
                        alt="profile"
                        style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover', border: '1px solid black' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>{feed.userId}</span>
                    <span style={{ fontSize: '0.8rem', color: '#808080' }}>• {displayTime}</span>
                </div>
                <span style={{ cursor: 'pointer', padding: '0 5px' }}>•••</span>
            </div>

            {/* 메인 이미지 */}
            <div style={{ width: '100%', aspectRatio: '1/1', background: 'white', borderTop: '2px solid black', borderBottom: '2px solid black' }}>
                <img src={mainImage} alt="feed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* 하단 로직 */}
            <div style={{ padding: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    {/* DB에 필드가 없는 값은 기본값 0으로 처리 */}
                    <button className="y2k-button" style={{ width: 'auto', padding: '5px 10px', margin: 0 }}>❤️ {feed.likes || 0}</button>
                    <button className="y2k-button" style={{ width: 'auto', padding: '5px 10px', margin: 0 }}>💬 {feed.comments || 0}</button>
                </div>
                <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 'bold' }}>{feed.userId}</span> {feed.content}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#808080', marginTop: '8px' }}>{formattedDate}</div>
            </div>
        </article>
    );
};

export default FeedItem;