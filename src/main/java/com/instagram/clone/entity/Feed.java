package com.instagram.clone.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "feed")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime uploadTime;

    private Long hashtagId; // Nullable

    // 엔티티가 저장되기 전 시간을 자동으로 설정
    @PrePersist
    public void prePersist() {
        if (this.uploadTime == null) {
            this.uploadTime = LocalDateTime.now();
        }
    }

    // 피드 이미지
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedImage> images = new ArrayList<>();

    public void update(String content) {
        this.content = content;
    }
}