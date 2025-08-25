package org.example.backend.services

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.example.backend.models.Message
import org.example.backend.repositories.MessageRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.springframework.data.repository.findByIdOrNull

class MessageServiceTest {

    private val repository: MessageRepository = mockk(relaxed = true)
    private val service = MessageService(repository)

    @Test
    fun `findMessages returns list from repository`() {
        val messages = listOf(Message("hello", "1"), Message("world", "2"))
        every { repository.findAll() } returns messages

        val result = service.findMessages()

        assertEquals(messages, result)
        verify(exactly = 1) { repository.findAll() }
    }

    @Test
    fun `findMessageById delegates to repository`() {
        val msg = Message("hello", "1")
        every { repository.findById("1") } returns java.util.Optional.of(msg)

        val result = service.findMessageById("1")

        assertEquals(msg, result)
        verify(exactly = 1) { repository.findById("1") }
    }

    @Test
    fun `findMessageById returns null when not found`() {
        every { repository.findById("missing") } returns java.util.Optional.empty()

        val result = service.findMessageById("missing")

        assertNull(result)
        verify(exactly = 1) { repository.findById("missing") }
    }

    @Test
    fun `save delegates to repository`() {
        val toSave = Message("hey")
        val saved = Message("hey", "123")
        every { repository.save(toSave) } returns saved

        val result = service.save(toSave)

        assertEquals(saved, result)
        verify(exactly = 1) { repository.save(toSave) }
    }
} 