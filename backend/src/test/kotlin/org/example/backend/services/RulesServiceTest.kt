package org.example.backend.services

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.example.backend.entities.RulesLetters
import org.example.backend.repositories.RulesRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class RulesServiceTest {

    private val repository: RulesRepository = mockk(relaxed = true)
    private val service = RulesService(repository)

    @Test
    fun `When finding all letter rules, Then it should return all letter rules with correct score`() {
        val letterRules = listOf(
            RulesLetters('A', 1),
            RulesLetters('E', 1),
            RulesLetters('I', 1),
            RulesLetters('O', 1),
            RulesLetters('U', 1),
            RulesLetters('L', 1),
            RulesLetters('N', 1),
            RulesLetters('S', 1),
            RulesLetters('T', 1),
            RulesLetters('R', 1),
            RulesLetters('D', 2),
            RulesLetters('G', 2),
            RulesLetters('B', 3),
            RulesLetters('C', 3),
            RulesLetters('M', 3),
            RulesLetters('P', 3),
            RulesLetters('F', 4),
            RulesLetters('H', 4),
            RulesLetters('V', 4),
            RulesLetters('W', 4),
            RulesLetters('Y', 4),
            RulesLetters('K', 6),
            RulesLetters('J', 8),
            RulesLetters('X', 8),
            RulesLetters('Q', 10),
            RulesLetters('Z', 10)
        )
        every { repository.findAll() } returns letterRules

        val result = service.findAllLetterRules()

        assertEquals(letterRules, result)
        verify(exactly = 1) { repository.findAll() }
    }
} 