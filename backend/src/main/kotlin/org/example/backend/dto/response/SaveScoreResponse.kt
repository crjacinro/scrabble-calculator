package org.example.backend.dto.response

import org.example.backend.entities.Scores


data class SaveScoreResponse(
    val id: Long,
    val wordUsed: String,
    val score: Int,
)

fun Scores.toResponse(): SaveScoreResponse =
    SaveScoreResponse(
        id = this.id,
        wordUsed = this.wordUsed,
        score = this.score
    )