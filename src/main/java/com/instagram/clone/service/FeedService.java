package com.instagram.clone.service;

import com.instagram.clone.entity.Feed;
import com.instagram.clone.entity.FeedImage;
import com.instagram.clone.repository.FeedImageRepository;
import com.instagram.clone.repository.FeedRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.File;
import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;
    private final FeedImageRepository feedImageRepository;

    // 이미지가 저장될 실제 경로 (로컬에 저장하는 방식으로 구현)
    private final String uploadPath = "C:/Users/user/Documents/GitHub/RetroGram/src/main/front/public/";

    public List<Feed> getAllFeeds() {
        // 모든 피드를 최신순으로 가져온다.
        // 작성일 내림차순
        return feedRepository.findAll(Sort.by(Sort.Direction.DESC, "uploadTime"));
    }

    // 피드 저장
    @Transactional
    public void createFeed(String userId, String content, MultipartFile file) throws IOException {
        // Feed DB Insert
        Feed feed = Feed.builder()
                .userId(userId)
                .content(content)
                .uploadTime(LocalDateTime.now())
                .build();
        Feed savedFeed = feedRepository.save(feed);

        // 파일 저장
        if(file != null && !file.isEmpty()) {
            // 원본 파일명
            String originalFilename = file.getOriginalFilename();
            String extension = "";  // 확장자
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            } else {
                extension = ".jpg"; // 확장자가 없을 경우 기본값
            }

            // 저장할 파일명
            String fileName = "sampleImg" + savedFeed.getId() + extension;;
            File dest = new File(uploadPath + fileName);
            file.transferTo(dest);

            // FeedImage DB Insert
            FeedImage feedImage = FeedImage.builder()
                    .feed(savedFeed)
                    .imageUrl("/"+fileName)
                    .build();
            feedImageRepository.save(feedImage);
        }
    }
}
