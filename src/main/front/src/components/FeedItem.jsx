import React, {useState} from 'react';
import axios from "axios";

const FeedItem = ({ feed, onEdit, onDelete, onReport,onUserClick }) => {
    // 메뉴 오픈 상태
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // 메뉴 바깥 클릭 시 닫히게 하거나, 버튼 클릭 시 토글
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    // 댓글
    const [commentContent, setCommentContent] = useState("");
    // 좋아요 관리
    const [liked, setLiked] = useState(feed.isLiked || false); // 내가 좋아요 눌렀는지 여부
    const [likeCount, setLikeCount] = useState(feed.likes || 0); // 좋아요 개수

    // 현재 로그인한 유저 정보, 피드의 작성자 일치 여부
    const loginUser = localStorage.getItem("user");
    const isOwner = loginUser === feed.userId;

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

    // 댓글 작성
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) return;

        try {
            const response = await axios.post('/api/comments', {
                feedId: feed.id,
                userNum: localStorage.getItem("userNum"), // DB 설계를 위해 userNum 저장 필수!
                content: commentContent,
                parentCommentId: null // 일반 댓글이므로 null
            });

            if (response.status === 200) {
                setCommentContent(""); // 입력창 비우기
                // 성공 후 댓글 목록을 새로 불러오는 로직 필요 (예: onRefresh())
            }
        } catch (error) {
            console.error("댓글 작성 실패:", error);
        }
    };

    // 좋아요 토글
    const handleLikeToggle = async () => {
        try {
            const userNum = localStorage.getItem("userNum");

            const response = await axios.post(`/api/likes/${feed.id}`, {
                userNum: parseInt(userNum),
                targetType: "FEED"
            });

            if (response.data === true) {
                setLiked(true);
                setLikeCount(prev => prev + 1);
            } else {
                setLiked(false);
                setLikeCount(prev => prev - 1);
            }
        } catch (error) {
            console.error("좋아요 처리 실패:", error);
        }
    };

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
                    <span style={{ fontWeight: 'bold', cursor:'pointer' }}
                          onClick={onUserClick}>
                        {feed.userId}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#808080' }}>• {displayTime}</span>
                </div>

                {/* 점 세개 버튼 */}
                <div style={{ position: 'relative' }}>
                    <span
                        style={{ cursor: 'pointer', padding: '0 5px', fontSize: '1.2rem' }}
                        onClick={toggleMenu}
                    >
                        •••
                    </span>

                    {/* 팝업 메뉴 */}
                    {isMenuOpen && (
                        <div className="y2k-container" style={{
                            position: 'absolute',
                            right: 0,
                            top: '25px',
                            width: '100px',
                            zIndex: 10,
                            background: '#c0c0c0',
                            boxShadow: '2px 2px 0px white inset, -2px -2px 0px #808080 inset'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {isOwner ? (
                                    <>
                                        <button className="menu-item-btn" onClick={() => { onEdit(feed); setIsMenuOpen(false); }}>수정</button>
                                        <button className="menu-item-btn" onClick={() => { onDelete(feed.id); setIsMenuOpen(false); }}>삭제</button>
                                    </>
                                ) : (
                                    <button className="menu-item-btn" onClick={() => { onReport(feed.id); setIsMenuOpen(false); }}>신고</button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 메인 이미지 */}
            <div style={{ width: '100%', aspectRatio: '1/1', background: 'white', borderTop: '2px solid black', borderBottom: '2px solid black' }}>
                <img src={mainImage} alt="feed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* 하단 로직 */}
            <div style={{ padding: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    {/* DB에 필드가 없는 값은 기본값 0으로 처리 */}
                    <button
                        className="y2k-button"
                        onClick={handleLikeToggle}
                        style={{
                            width: 'auto',
                            padding: '5px 10px',
                            margin: 0,
                            backgroundColor: liked ? '#ffb3ba' : '#c0c0c0', // 좋아요 누르면 연분홍색(Y2K 감성)
                            color: liked ? 'red' : 'black'
                        }}
                    >
                        {liked ? '❤️' : '🤍'} {likeCount}
                    </button>
                    <button className="y2k-button" style={{ width: 'auto', padding: '5px 10px', margin: 0 }}>💬 {feed.comments || 0}</button>
                </div>
                <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 'bold' }}>{feed.userId}</span> {feed.content}
                </div>
                <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '5px', marginTop:"10px" }}>
                    <input
                        className="y2k-input"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                        style={{ flex: 1, border: '1px solid black' }}
                    />
                    <button type="submit" className="y2k-button" style={{ width: '50px', height:"55px", padding:"10px", marginTop:"0px" }}>전송</button>
                </form>
                <div style={{ fontSize: '0.75rem', color: '#808080', marginTop: '8px' }}>{formattedDate}</div>
            </div>
        </article>
    );
};

export default FeedItem;