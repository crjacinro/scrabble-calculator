package org.example.backend.services

import org.example.backend.entities.WordScore
import org.example.backend.repositories.ScoresRepository
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class ScoresService(private val scoresDb: ScoresRepository, private val rulesDb: RulesService) {
    fun getHighestScores(topK: Int): List<WordScore> = scoresDb.findAllByOrderByScoreDesc(Pageable.ofSize(topK))

    fun save(score: WordScore): WordScore {
        if (!score.wordUsed.all { it.isLetter() }) {
            throw IllegalArgumentException("Word used must contain only letters")
        }

        verifyScoreByRule(score, rulesDb.findAllLetterRules().associate { it.letter to it.score })

        return scoresDb.save(score)
    }

    private fun verifyScoreByRule(score: WordScore, rulesMap: Map<Char, Int>) {
        val computedScore = score.wordUsed.uppercase().sumOf { rulesMap[it] ?: 0 }
        if (computedScore != score.score) {
            throw IllegalArgumentException("Score ${score.score} does not match computed score $computedScore for word ${score.wordUsed}")
        }
    }
}