import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const EditProfileModal = ({ isOpen, onClose, userInfo, refreshProfile }) => {
    const [bio, setBio] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [previewImg, setPreviewImg] = useState(""); // 미리보기용
    const [selectedFile, setSelectedFile] = useState(null); // 실제 업로드 파일
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (userInfo) {
            setBio(userInfo.bio || "");
            setIsPrivate(userInfo.isPrivate === 1);
            setPreviewImg(userInfo.imgUrl || "/sampleImg1.jpg"); // 기존 이미지 세팅
        }
    }, [userInfo, isOpen]);

    if (!isOpen) return null;

    // 이미지 선택 시 미리보기 변경
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImg(URL.createObjectURL(file)); // 브라우저 메모리에 임시 URL 생성
        }
    };

    const handleSave = async () => {
        // 유효성 검사 (바이오 30자 제한)
        if (bio.length > 30) {
            alert("소개글은 30자 이내여야 합니다!");
            return;
        }

        try {
            const formData = new FormData();

            // 백엔드 @RequestParam 명칭과 일치해야 함
            formData.append("bio", bio);
            formData.append("isPrivate", isPrivate); // 불리언 그대로 넣으면 "true"/"false" 문자열로 전송됨

            // 파일이 있을 때만 추가
            if (selectedFile) {
                formData.append("profileImage", selectedFile);
            }

            // 요청 보내기
            await axios.put(`http://localhost:8080/api/users/${userInfo.userId}/profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // 파일 전송 시 필수!
                }
            });
            alert("프로필 수정 완료! ★");
            refreshProfile(userInfo.userId); // 상위 컴포넌트 데이터 갱신
            onClose(); // 모달 닫기

        } catch (error) {
            console.error("수정 실패:", error);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="y2k-container" style={{ width: '420px' }} onClick={(e) => e.stopPropagation()}>
                <div className="window-header"><span>User Settings</span></div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* 프로필 이미지 미리보기 (동그라미) */}
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid black', overflow: 'hidden', cursor: 'pointer' }}
                         onClick={() => fileInputRef.current.click()}>
                        <img src={previewImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="preview" />
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                    <p style={{ fontSize: '0.7rem', color: 'var(--win-gray-dark)', marginBottom: '5px' }}>이미지를 클릭하여 변경</p>

                    {/* 변경 불가능한 정보 */}
                    <div style={{ width: '100%'}}>
                        <label style={{ fontSize: '0.8rem' }}>User ID</label>
                        <input className="y2k-input" value={userInfo.userId} readOnly style={{ backgroundColor: '#ddd' }} />
                        <label style={{ fontSize: '0.8rem' }}>Email</label>
                        <input className="y2k-input" value={userInfo.email} readOnly style={{ backgroundColor: '#ddd' }} />
                    </div>

                    {/* 바이오 글자수 제한 */}
                    <div style={{ width: '100%' }}>
                        <label style={{ fontSize: '0.8rem' }}>Bio ({bio.length}/30)</label>
                        <textarea className="y2k-input" value={bio} onChange={(e) => setBio(e.target.value.slice(0, 30))} rows="2" style={{ resize: 'none' }} />
                    </div>

                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <input type="checkbox" id="pCheck" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
                        <label htmlFor="pCheck" style={{ fontSize: '0.9rem' }}>비공개 계정</label>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                        <button className="y2k-button" onClick={handleSave}>Save</button>
                        <button className="y2k-button" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;