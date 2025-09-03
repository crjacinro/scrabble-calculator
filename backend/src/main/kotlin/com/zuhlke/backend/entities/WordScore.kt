package com.zuhlke.backend.entities

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "word_scores")
data class WordScore(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @Column(name = "word_used", nullable = false, length = 50)
    val wordUsed: String,

    @Column(name = "score", nullable = false)
    val score: Int,

    @Column(name = "played_at", nullable = false)
    val playedAt: LocalDateTime = LocalDateTime.now()
)
