package org.example.backend.controllers

import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.example.backend.entities.Scores
import org.example.backend.services.ScoresService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(controllers = [ScoresController::class])
class ScoresControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockkBean
    lateinit var service: ScoresService

    @Test
    fun `When GET scores is invoked, Then it should return the top 10 scores by default`() {
        every { service.getHighestScores() } returns listOf(
            Scores(1, "abc", 123),
            Scores(2, "xyz", 456)
        )

        mockMvc.perform(get("/scores"))
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
} 