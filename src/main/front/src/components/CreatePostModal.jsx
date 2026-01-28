import React, { useState } from "react";
import axios from "axios";

const CreatePostModal = ({isOpen, onClose, refreshFeeds}) => {
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] =useState(null);

    if (!isOpen) return null;

    // 취소 또는 닫기 시 초기화 로직
    const handleClose = () => {
        setContent('');
        setImageFile(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        onClose();
    };

    // 이미지 선택 시 호출
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if(file) {
          setImageFile(file);
          setPreview(URL.createObjectURL(file));
      }
    };

    const handlePost = async () => {
      if(!content) {
          alert("내용을 입력해주세요!");
          return;
      }
      if(!imageFile) {
          alert("이미지를 선택해주세요!");
          return;
      }

      // 로컬스토리지에서 로그인 유저 가져오기
      const loginUser = localStorage.getItem("user");

      const formData = new FormData();
      formData.append('userId', loginUser);
      formData.append('content', content);
      formData.append('image', imageFile);

      try {
          await axios.post('http://localhost:8080/api/feeds/create', formData, {
              // 파일 전송 필수 헤더
              headers: { 'Content-Type': 'multipart/form-data' }
          })

          alert("게시물 업로드 완료! >.<");
          setContent('');
          setImageFile(null);
          setPreview(null);
          onClose();
          refreshFeeds();
      } catch (e) {
          console.error("게시 실패 : ", e);
          alert("게시물 업로드 실패.. ㅠ.ㅠ");
      }
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div
                className="y2k-container modal-content"
                style={{ width: '400px' }}
                onClick={(e) => e.stopPropagation()} // 클릭 전파 방지
            >
                <div className="window-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Create New Post</span>
                </div>

                <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div
                        className="y2k-container"
                        style={{
                            width: '100%',
                            aspectRatio: '1/1', // 정사각형 유지
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '1px solid black'
                        }}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        {preview ? (
                            <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <p style={{ color: '#808080' }}>[ 클릭하여 이미지 선택 ]</p>
                        )}
                    </div>

                    <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />

                    <textarea
                        className="y2k-input"
                        placeholder="무슨 생각을 하고 계신가요?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ width: '100%', height: '100px', resize: 'none', padding: '10px' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button className="y2k-button" onClick={handleClose}>취소</button>
                        <button className="y2k-button" onClick={handlePost}>게시</button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CreatePostModal;