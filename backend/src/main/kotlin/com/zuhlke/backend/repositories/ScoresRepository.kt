package com.zuhlke.backend.repositories

import com.zuhlke.backend.entities.WordScore
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface ScoresRepository : JpaRepository<WordScore, Long> {
    fun findAllByOrderByScoreDesc(pageable: Pageable): List<WordScore>
    fun existsByWordUsed(wordUsed: String): Boolean
}