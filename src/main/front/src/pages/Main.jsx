import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import FeedItem from '../components/FeedItem';
import CreatePostModal from "../components/CreatePostModal";
import EditPostModal from "../components/EditPostModal";
import Profile from "../components/Profile";
import EditProfileModal from "../components/EditProfileModal";
import LogoutButton from "../components/LogoutButton";
import '../styles/GlobalStyle.css';

const Main = () => {
    const [feeds, setFeeds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [view, setView] = useState('home');
    const [profileUser, setProfileUser] = useState(null);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    // 전체 피드를 불러오는 로직
    const loadFeeds = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/feeds');
            setFeeds(response.data);
        } catch (error) {
            console.error("피드 데이터를 불러올 수 없습니다.. : ", error);
        }
    };

    // 피드 삭제 로직
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

    // 피드 수정 버튼 클릭 시 모달 여는 로직
    const handleEdit = (feed) => {
        setSelectedFeed(feed);
        setIsEditModalOpen(true);
    };

    // 로그인한 사용자의 프로필 데이터를 불러오는 함수
    const loadProfileData = async (userId) => {
      try {
          const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
          setProfileUser(response.data);
          setView('profile');   // 데이터 로드 뷰 전환 (프로필페이지)
      }  catch (e) {
          alert("유저 정보를 불러오지 못했습니다..ㅠㅠ");
          console.error(e);
      }
    };

    // 내 프로필 버튼 클릭 핸들러 (사이드바)
    const handleMyProfileClick = () => {
      const loginUser = localStorage.getItem("user");
      loadProfileData(loginUser);
    };

    // 프로필 데이터 다시 불러오기 (수정 후 반영용)
    const refreshProfile = (userId) => {
      loadProfileData(userId);
    };

    useEffect(() => {
        loadFeeds();
    }, []);

    return (
        <div style={{ display: 'flex', padding: '20px', gap: '30px', alignItems: 'flex-start', justifyContent: 'center', minHeight: '100vh' }}>
            {/* 왼쪽 섹션 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '220px',
                position: 'sticky',
                top: '20px',
                height: 'fit-content'
            }}>
                <Sidebar
                    openModal={() => setIsModalOpen(true)}
                    setView={setView}
                    view={view}
                    onProfileClick={handleMyProfileClick}
                />
                <LogoutButton />
            </div>

            {/* 오른쪽 섹션 */}
            <main style={{ flex: 'none', width: '500px', display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
                {view === 'home' ? (
                    // 기존 피드 리스트
                    Array.isArray(feeds) && feeds.map(feed => (
                        <FeedItem
                            key={feed.id}
                            feed={feed}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onReport={(id) => alert(`${id}번 글을 신고했습니다.`)}
                            onUserClick={() => loadProfileData(feed.userId)}
                        />
                    ))
                ) : (
                    // Profile 컴포넌트 연결
                    profileUser &&
                    <Profile
                        feeds={feeds}
                        userInfo={profileUser}
                        onEditClick={() => setIsEditProfileOpen(true)}
                    />
                )}
            </main>

            {/* 글 작성 모달 */}
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                refreshFeeds={loadFeeds}
            />

            {/* 프로필 수정 모달 컴포넌트 */}
            <EditProfileModal
                isOpen={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                userInfo={profileUser}
                refreshProfile={loadProfileData}
            />

            {/* 수정 모달 컴포넌트 */}
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