package org.example.backend.controllers

import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.example.backend.entities.RulesLetters
import org.example.backend.services.RulesService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(controllers = [RulesController::class])
class RulesControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockkBean
    lateinit var service: RulesService

    @Test
    fun `When GET rules is invoked, Then it should return the rules on the score per letter as a list`() {
        every { service.findAllLetterRules() } returns listOf(RulesLetters('a', 1), RulesLetters('z', 10))

        mockMvc.perform(get("/rules"))
            .andExpect(status().isOk)
            .andExpect(
                content().json(
                    """
                  {"scoresPerLetter":{"a":1,"z":10}}
            """.trimIndent()
                )
            )
    }
} 