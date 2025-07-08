package com.golf.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "detections")
public class Detection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable = false)
    private String detectionType;

    @Column(nullable = false)
    private Double confidence;

    @Column(columnDefinition = "JSON")
    private String coordinates;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
} 