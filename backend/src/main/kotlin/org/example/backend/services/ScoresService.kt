package org.example.backend.services

import org.example.backend.entities.Scores
import org.example.backend.repositories.ScoresRepository
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class ScoresService(private val db: ScoresRepository) {
    fun getHighestScores(topK: Int): List<Scores> = db.findAllByOrderByScoreDesc(Pageable.ofSize(topK))

    fun save(score: Scores): Scores = db.save(score)
}