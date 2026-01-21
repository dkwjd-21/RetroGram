package com.instagram.clone.controller;

import com.instagram.clone.entity.User;
import com.instagram.clone.dto.LoginRequest;
import com.instagram.clone.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // 리액트 서버의 접근을 허용
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user){
        try {
            // 리액트에서 보낸 데이터로 회원가입 진행
            User savedUser = authService.signup(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            // 중복 아이디 등의 이유로 실패
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = authService.login(loginRequest.getUserId(), loginRequest.getPassword());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
