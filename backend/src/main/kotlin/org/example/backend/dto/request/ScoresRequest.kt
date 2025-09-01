package org.example.backend.dto.request

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import org.example.backend.entities.WordScore

data class ScoresRequest(
    @field:NotBlank(message = "Word combination is required")
    val wordUsed: String,
    @field:Min(value = 0, message = "Score must be non-negative")
    val score: Int,
)

fun ScoresRequest.toEntity(): WordScore =
    WordScore(
        wordUsed = this.wordUsed.uppercase(),
        score = this.score
    )