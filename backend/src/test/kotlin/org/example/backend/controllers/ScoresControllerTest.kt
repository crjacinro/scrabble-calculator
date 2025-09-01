package org.example.backend.controllers

import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.example.backend.entities.WordScore
import org.example.backend.services.ScoresService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.time.LocalDateTime

@WebMvcTest(controllers = [ScoresController::class])
class ScoresControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockkBean
    lateinit var service: ScoresService

    @Test
    fun `When GET scores is invoked, Then it should return the top k scores by default`() {
        every { service.getHighestScores(2) } returns listOf(
            WordScore(1, "abc", 123),
            WordScore(2, "xyz", 456),
        )

        mockMvc.perform(get("/scores?top=2"))
            .andExpect(status().isOk)
            .andExpect(
                content().json(
                    """
                  {"topScores":[
                      {"wordUsed":  "abc", score:  123},
                      {"wordUsed":  "xyz", score:  456}
                  ]}
            """.trimIndent()
                )
            )
    }

    @Test
    fun `When POST scores is invoked, Then the score should be stored by the service returns saved score`() {
        val incomingJson = """{"wordUsed": "HELLO", "score": 5}"""
        val timestamp = LocalDateTime.of(2024, 1, 1, 12, 0)
        val saved = WordScore(id = 123, wordUsed = "HELLO", score = 5, playedAt = timestamp)
        every { service.save(match { it.wordUsed == "HELLO" && it.score == 5 }) } returns saved

        mockMvc.perform(
            post("/scores")
                .contentType(MediaType.APPLICATION_JSON)
                .content(incomingJson)
        )
            .andExpect(status().isCreated)
            .andExpect(header().string("Location", "/scores/123"))
            .andExpect(content().json("""{"id": 123, "wordUsed": "HELLO", "score": 5}"""))
    }
} 