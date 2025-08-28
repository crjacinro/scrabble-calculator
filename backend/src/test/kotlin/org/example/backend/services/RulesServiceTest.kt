package org.example.backend.services

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.example.backend.entities.LetterRule
import org.example.backend.repositories.RulesRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class RulesServiceTest {

    private val repository: RulesRepository = mockk(relaxed = true)
    private val service = RulesService(repository)

    @Test
    fun `When finding all letter rules, Then it should return all letter rules with correct score`() {
        val letterRules = listOf(
            LetterRule('A', 1),
            LetterRule('E', 1),
            LetterRule('I', 1),
            LetterRule('O', 1),
            LetterRule('U', 1),
            LetterRule('L', 1),
            LetterRule('N', 1),
            LetterRule('S', 1),
            LetterRule('T', 1),
            LetterRule('R', 1),
            LetterRule('D', 2),
            LetterRule('G', 2),
            LetterRule('B', 3),
            LetterRule('C', 3),
            LetterRule('M', 3),
            LetterRule('P', 3),
            LetterRule('F', 4),
            LetterRule('H', 4),
            LetterRule('V', 4),
            LetterRule('W', 4),
            LetterRule('Y', 4),
            LetterRule('K', 6),
            LetterRule('J', 8),
            LetterRule('X', 8),
            LetterRule('Q', 10),
            LetterRule('Z', 10)
        )
        every { repository.findAll() } returns letterRules

        val result = service.findAllLetterRules()

        assertEquals(letterRules, result)
        verify(exactly = 1) { repository.findAll() }
    }
} 