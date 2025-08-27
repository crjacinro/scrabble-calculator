package org.example.backend.repositories

import org.example.backend.entities.Scores
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface ScoresRepository : JpaRepository<Scores, Long> {
    fun findAllByOrderByScoreDesc(pageable: Pageable): List<Scores>
}