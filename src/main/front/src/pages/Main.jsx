import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import FeedItem from '../components/FeedItem';
import CreatePostModal from "../components/CreatePostModal";
import EditPostModal from "../components/EditPostModal";
import '../styles/GlobalStyle.css';

const Main = () => {
    const [feeds, setFeeds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedFeed, setSelectedFeed] = useState(null);

    const loadFeeds = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/feeds');
            setFeeds(response.data);
        } catch (error) {
            console.error("피드 데이터를 불러올 수 없습니다.. : ", error);
        }
    };

    // 삭제 로직 추가
    const handleDelete = async (id) => {
        if (!window.confirm("정말 이 게시물을 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/feeds/${id}`);
            alert("게시물이 삭제되었습니다.");
            loadFeeds(); // 목록 새로고침
        } catch (error) {
            alert("삭제에 실패했습니다.");
        }
    };

    // 수정 버튼 클릭 시 모달 여는 로직
    const handleEdit = (feed) => {
        setSelectedFeed(feed);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        loadFeeds();
    }, []);

    return (
        <div style={{ display: 'flex', padding: '20px', gap: '30px', alignItems: 'flex-start', justifyContent: 'center', minHeight: '100vh' }}>
            <Sidebar openModal={() => setIsModalOpen(true)}/>

            <main style={{ flex: 'none', width: '500px', display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
                {Array.isArray(feeds) && feeds.map(feed => (
                    <FeedItem
                        key={feed.id}
                        feed={feed}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onReport={(id) => alert(`${id}번 글을 신고했습니다.`)}
                    />
                ))}
            </main>

            {/* 글 작성 모달 */}
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                refreshFeeds={loadFeeds}
            />

            {/* 수정 모달 컴포넌트 추가 */}
            <EditPostModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                feed={selectedFeed}
                refreshFeeds={loadFeeds}
            />
        </div>
    );
};

export default Main;