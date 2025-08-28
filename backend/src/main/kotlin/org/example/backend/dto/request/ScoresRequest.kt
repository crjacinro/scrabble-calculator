package org.example.backend.dto.request

import org.example.backend.entities.Scores

data class ScoresRequest(
    val wordUsed: String,
    val score: Int,
)

fun ScoresRequest.toEntity(): Scores =
    Scores(
        wordUsed = this.wordUsed,
        score = this.score
    )