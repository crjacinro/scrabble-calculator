package org.example.backend.services

import org.example.backend.entities.WordScore
import org.example.backend.repositories.ScoresRepository
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class ScoresService(private val scoresDb: ScoresRepository, private val rulesService: RulesService) {
    fun getHighestScores(topK: Int): List<WordScore> = scoresDb.findAllByOrderByScoreDesc(Pageable.ofSize(topK))

    fun save(score: WordScore): WordScore {
        verifyIsWordExists(score)
        verifyIsLetterValid(score)
        verifyScoreByRule(score)

        return scoresDb.save(score)
    }

    private fun verifyIsWordExists(score: WordScore) {
        if (scoresDb.existsByWordUsed(score.wordUsed)) {
            throw IllegalArgumentException("Sorry! This word has already been used")
        }
    }

    private fun verifyIsLetterValid(score: WordScore) {
        if (!score.wordUsed.all { it in 'A'..'Z' }) {
            throw IllegalArgumentException("Word used must contain only A to Z letters")
        }
    }

    private fun verifyScoreByRule(score: WordScore) {
        val rulesMap = rulesService.findAllLetterRules().associate { it.letter to it.score }
        val computedScore = score.wordUsed.uppercase().sumOf { rulesMap[it] ?: 0 }
        if (computedScore != score.score) {
            throw IllegalArgumentException("Score ${score.score} does not match computed score $computedScore for word ${score.wordUsed}")
        }
    }
}