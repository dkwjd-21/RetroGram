package com.instagram.clone.controller;

import com.instagram.clone.dto.UserDto;
import com.instagram.clone.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // 유저 상세 정보 조회
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserProfile(@PathVariable String userId) {
        UserDto userDto = userService.getUserProfile(userId);
        return ResponseEntity.ok(userDto);
    }

    // 유저 정보 업데이트
    @PutMapping("/{userId}/profile")
    public ResponseEntity<String> updateProfile(
            @PathVariable String userId,
            @RequestParam("bio") String bio,
            @RequestParam("isPrivate") boolean isPrivate,
            @RequestParam(value = "profileImage", required = false) MultipartFile file) throws IOException {

        userService.updateProfileWithFile(userId, bio, isPrivate, file);
        return ResponseEntity.ok("Success");
    }
}
