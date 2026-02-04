// src/components/EditPostModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPostModal = ({ isOpen, onClose, feed, refreshFeeds }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (feed) setContent(feed.content); // 모달 열릴 때 기존 내용 세팅
    }, [feed]);

    if (!isOpen) return null;

    // 이미지 경로
    const previewImage = feed?.images && feed.images.length > 0
        ? feed.images[0].imageUrl
        : '/sampleImg1.jpg';

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/api/feeds/${feed.id}`, {
                content: content
            });
            alert("성공적으로 수정되었습니다!★");
            onClose();
            refreshFeeds();
        } catch (error) {
            alert("수정 실패.. 다시 시도해주세요.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="y2k-container modal-content" style={{ width: '400px' }} onClick={e => e.stopPropagation()}>
                <div className="window-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Edit Post - RetroGram</span>
                </div>
                <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {/* 이미지 미리보기 (수정 불가) */}
                    <div style={{ width: '100%', aspectRatio: '1/1', border: '1px solid black', background: '#eee' }}>
                        <img
                            src={previewImage}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt="post"
                        />
                    </div>
                    <textarea
                        className="y2k-input"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ width: '100%', height: '100px', resize: 'none', padding: '10px' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button className="y2k-button" onClick={onClose}>취소</button>
                        <button className="y2k-button" onClick={handleUpdate}>수정하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;