package com.instagram.clone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.instagram.clone.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository<엔티티이름, PK의타입>
    // 메서드를 정의하면 JPA가 알아서 SQL 쿼리를 만들어준다.

    // 중복 가입 방지를 위해 userId나 email로 사용자가 존재하는지 확인하는 메서드
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);

    Optional<User> findByUserId(String userId);
}
