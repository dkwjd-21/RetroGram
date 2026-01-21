package com.instagram.clone.service;

import com.instagram.clone.entity.User;
import com.instagram.clone.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public User signup(User user){      // 회원가입
        // 1) 중복 체크
        if(userRepository.existsByUserId(user.getUserId())){
            throw new RuntimeException("이미 사용 중인 아이디입니다.");
        }

        // 2) 비밀번호 암호화
        String rawPassword = user.getPassword();                    // 입력한 비밀번호
        String encPassword = passwordEncoder.encode(rawPassword);   // 암호화된 비밀번호
        user.setPassword(encPassword);

        // 3) 회원 테이블에 INSERT
        return userRepository.save(user);
    }

    public User login(String userId, String password) {     // 로그인
        // 1) 아이디로 사용자 찾기
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다..ㅠㅠ"));

        // 2) 비밀번호 비교 (입력한 비밀번호 <-> DB에 저장된 비밀번호)
        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException("비밀번호가 일치하지 않습니다..");
        }

        // 로그인 성공 시 사용자 정보 반환
        return user;
    }
}
