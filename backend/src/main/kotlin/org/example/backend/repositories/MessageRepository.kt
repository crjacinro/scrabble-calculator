package org.example.backend.repositories

import org.example.backend.models.Message
import org.springframework.data.jpa.repository.JpaRepository

interface MessageRepository : JpaRepository<Message, String>