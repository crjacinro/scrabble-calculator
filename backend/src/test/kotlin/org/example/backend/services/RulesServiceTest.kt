package org.example.backend.services

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import letterRules
import org.example.backend.repositories.RulesRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class RulesServiceTest {

    private val repository: RulesRepository = mockk(relaxed = true)
    private val service = RulesService(repository)

    @Test
    fun `When finding all letter rules, Then it should return all letter rules with correct score`() {
        every { repository.findAll() } returns letterRules

        val result = service.findAllLetterRules()

        assertEquals(letterRules, result)
        verify(exactly = 1) { repository.findAll() }
    }
} 