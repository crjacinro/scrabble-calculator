package org.example.backend.repositories

import org.example.backend.models.Message
import org.springframework.data.repository.CrudRepository

interface MessageRepository : CrudRepository<Message, String>