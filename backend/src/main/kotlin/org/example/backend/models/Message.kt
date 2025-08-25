package org.example.backend.models

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.PrePersist
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "messages")
data class Message(
    @Column(name = "text", nullable = false)
    val text: String,

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    var id: String? = null
) {
    @PrePersist
    fun ensureId() {
        if (id == null) {
            id = UUID.randomUUID().toString()
        }
    }
}