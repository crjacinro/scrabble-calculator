package org.example.backend.controllers

import com.ninjasquad.springmockk.MockkBean
import org.example.backend.models.Message
import org.example.backend.services.MessageService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.header
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import io.mockk.every

@WebMvcTest(controllers = [MessagesController::class])
class MessagesControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockkBean
    lateinit var service: MessageService

    @Test
    fun `GET messages returns list`() {
        every { service.findMessages() } returns listOf(Message("a", "1"), Message("b", "2"))

        mockMvc.perform(get("/messages"))
            .andExpect(status().isOk)
            .andExpect(content().json("""
                [
                  {"text":"a","id":"1"},
                  {"text":"b","id":"2"}
                ]
            """.trimIndent()))
    }

    @Test
    fun `POST messages creates and returns saved message`() {
        val incomingJson = """{"text":"hello"}"""
        val saved = Message("hello", "abc")
        every { service.save(Message("hello", null)) } returns saved

        mockMvc.perform(
            post("/messages")
                .contentType(MediaType.APPLICATION_JSON)
                .content(incomingJson)
        )
            .andExpect(status().isCreated)
            .andExpect(header().string("Location", "/abc"))
            .andExpect(content().json("""{"text":"hello","id":"abc"}"""))
    }

    @Test
    fun `GET message by id returns 200 when found`() {
        every { service.findMessageById("id1") } returns Message("x", "id1")

        mockMvc.perform(get("/messages/id1"))
            .andExpect(status().isOk)
            .andExpect(content().json("""{"text":"x","id":"id1"}"""))
    }

    @Test
    fun `GET message by id returns 404 when not found`() {
        every { service.findMessageById("missing") } returns null

        mockMvc.perform(get("/messages/missing"))
            .andExpect(status().isNotFound)
    }
} 