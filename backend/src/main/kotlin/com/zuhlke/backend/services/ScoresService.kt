package com.zuhlke.backend.services

import com.zuhlke.backend.entities.WordScore
import com.zuhlke.backend.repositories.ScoresRepository
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.WebClientResponseException

@Service
class ScoresService(
    private val scoresDb: ScoresRepository,
    private val rulesService: RulesService,
    private val webClient: WebClient = WebClient.builder().build()
) {
    fun getHighestScores(topK: Int): List<WordScore> = scoresDb.findAllByOrderByScoreDesc(Pageable.ofSize(topK))

    fun save(score: WordScore): WordScore {
        verifyIsWordExists(score)
        verifyIsLetterValid(score)
        verifyIsWordInDictionary(score)
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

    private fun verifyIsWordInDictionary(score: WordScore) {
        try {
            webClient.get()
                .uri("https://api.dictionaryapi.dev/api/v2/entries/en/${score.wordUsed.lowercase()}")
                .retrieve()
                .bodyToMono(String::class.java)
                .block()
        } catch (e: WebClientResponseException) {
            if (e.statusCode.value() == 404) {
                throw IllegalArgumentException("This is not a valid English word in our dictionary. Try again!")
            } else {
                throw IllegalArgumentException("Unable to verify word. Dictionary unavailable")
            }
        } catch (e: Exception) {
            throw IllegalArgumentException("Unable to verify word. Dictionary unavailable")
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