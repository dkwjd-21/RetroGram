package com.instagram.clone.repository;

import com.instagram.clone.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {
    // JpaRepository<엔티티이름, PK의타입>
    // 메서드를 정의하면 JPA가 알아서 SQL 쿼리를 만들어준다.
}
