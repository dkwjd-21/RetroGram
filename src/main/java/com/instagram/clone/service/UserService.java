package com.instagram.clone.service;

import com.instagram.clone.dto.UserDto;
import com.instagram.clone.entity.User;
import com.instagram.clone.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserDto getUserProfile(String userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다."));

        UserDto dto = new UserDto();
        dto.setUserNum(user.getUserNum());
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setBio(user.getBio());
        dto.setImgUrl(user.getImgUrl());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setPrivate(user.isPrivate());

        return dto;
    }

    @Transactional
    public void updateProfileWithFile(String userId, String bio, boolean isPrivate, MultipartFile file) throws IOException {
        User user = userRepository.findByUserId(userId).orElseThrow();

        if (file != null && !file.isEmpty()) {
            // 1. 파일명 규칙 적용
            String originalName = file.getOriginalFilename();
            String extension = originalName.substring(originalName.lastIndexOf("."));
            String fileName = "profileImg" + userId + extension;

            // 2. 정확한 로컬 저장 경로 설정 (public 내의 profileImages 폴더)
            String uploadPath = System.getProperty("user.dir") + "/src/main/front/public/profileImages/";

            File folder = new File(uploadPath);
            if (!folder.exists()) {
                folder.mkdirs(); // 폴더가 없으면 생성
            }

            File saveFile = new File(uploadPath + fileName);
            file.transferTo(saveFile); // 실제 로컬 파일 저장 실행

            // 3. DB 저장 경로 (리액트 public 기준 상대경로)
            user.setImgUrl("/profileImages/" + fileName);
        }

        user.setBio(bio);
        user.setPrivate(isPrivate);

        // 트랜잭션이 끝나면 자동으로 save() 됨
    }
}
