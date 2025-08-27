package org.example.backend.services

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.example.backend.entities.Scores
import org.example.backend.repositories.ScoresRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.data.domain.Pageable

class ScoresServiceTest {

    private val repository: ScoresRepository = mockk(relaxed = true)
    private val service = ScoresService(repository)

    @Test
    fun `When finding the top k highest scores, Then it should return the list with the top 10 highest scores`() {
        val topScores = listOf(
            Scores(wordUsed = "abc", score = 5),
            Scores(wordUsed = "xyz", score = 7),
        )
        val topK = 10
        val pageTopK = Pageable.ofSize(topK)
        every { repository.findAllByOrderByScoreDesc(pageTopK) } returns topScores

        val result = service.getHighestScores()

        assertEquals(topScores, result)
        verify(exactly = 1) { repository.findAllByOrderByScoreDesc(pageTopK) }
    }
} 