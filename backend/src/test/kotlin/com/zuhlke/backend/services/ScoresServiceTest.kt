package com.zuhlke.backend.services

import com.zuhlke.backend.entities.WordScore
import com.zuhlke.backend.repositories.ScoresRepository
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import letterRules
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.data.domain.Pageable

class ScoresServiceTest {

    private val scoresRepository: ScoresRepository = mockk(relaxed = true)
    private val rulesService: RulesService = mockk(relaxed = true)
    private val service = ScoresService(scoresRepository, rulesService)

    @Test
    fun `When finding the top k highest scores, Then it should return the list with the top k highest scores`() {
        val topScores = listOf(
            WordScore(wordUsed = "abc", score = 5),
            WordScore(wordUsed = "xyz", score = 7),
        )
        val topK = 10
        val pageTopK = Pageable.ofSize(topK)
        every { scoresRepository.findAllByOrderByScoreDesc(pageTopK) } returns topScores

        val result = service.getHighestScores(topK)

        assertEquals(topScores, result)
        verify(exactly = 1) { scoresRepository.findAllByOrderByScoreDesc(pageTopK) }
    }

    @Test
    fun `When saving a score that does not match based on the rules, Then the service should throw an error`() {
        val scoreToSave = WordScore(wordUsed = "abc", score = 5)
        assertThrows<IllegalArgumentException> {
            service.save(scoreToSave)
        }
        verify(exactly = 0) { scoresRepository.save(scoreToSave) }
    }

    @Test
    fun `When saving a score with invalid letters used, Then the service should throw an error`() {
        val scoreToSave = WordScore(wordUsed = "Ü@a", score = 5)
        assertThrows<IllegalArgumentException> {
            service.save(scoreToSave)
        }
        verify(exactly = 0) { scoresRepository.save(scoreToSave) }
    }

    @Test
    fun `When saving a score that is an existing word, Then the service it should throw an error`() {
        every { scoresRepository.existsByWordUsed("EXCITING") } returns true

        val scoreToSave = WordScore(wordUsed = "EXCITING", score = 5)
        assertThrows<IllegalArgumentException> {
            service.save(scoreToSave)
        }
        verify(exactly = 0) { scoresRepository.save(scoreToSave) }
    }

    @Test
    fun `When saving a score - word combination that is valid, Then it should be saved successfully`() {
        val scoreToSave = WordScore(wordUsed = "AEIOU", score = 5)
        every { rulesService.findAllLetterRules() } returns letterRules
        every { scoresRepository.save(scoreToSave) } returns scoreToSave
        service.save(scoreToSave)
        verify(exactly = 1) { scoresRepository.save(scoreToSave) }
    }
} 