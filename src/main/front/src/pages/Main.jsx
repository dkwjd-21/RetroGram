// src/pages/Main.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import FeedItem from '../components/FeedItem';
import CreatePostModal from "../components/CreatePostModal";
import '../styles/GlobalStyle.css';

const Main = () => {
    const [feeds, setFeeds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadFeeds = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/feeds');
            // API 응답 구조가 배열인지 확인 후 세팅
            setFeeds(response.data);
        } catch (error) {
            console.error("피드 데이터를 불러올 수 없습니다.. : ", error);
        }
    };

    useEffect(() => {
        loadFeeds();
    }, []);

    return (
        <div style={{ display: 'flex', padding: '20px', gap: '30px', alignItems: 'flex-start', justifyContent: 'center', minHeight: '100vh' }}>
            <Sidebar openModal={() => setIsModalOpen(true)}/>
            <main style={{ flex: 'none', width: '500px', display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
                {Array.isArray(feeds) && feeds.map(feed => (
                    <FeedItem key={feed.id} feed={feed} />
                ))}
            </main>

            {/* 모달 컴포넌트 */}
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                refreshFeeds={loadFeeds}
            />
        </div>
    );
};

export default Main;