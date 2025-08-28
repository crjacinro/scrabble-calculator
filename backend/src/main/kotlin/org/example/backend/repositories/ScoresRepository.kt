package org.example.backend.repositories

import org.example.backend.entities.WordScore
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface ScoresRepository : JpaRepository<WordScore, Long> {
    fun findAllByOrderByScoreDesc(pageable: Pageable): List<WordScore>
}