package com.zuhlke.backend.dto.response

import com.zuhlke.backend.entities.WordScore


data class SaveScoreResponse(
    val id: Long,
    val wordUsed: String,
    val score: Int,
)

fun WordScore.toResponse(): SaveScoreResponse =
    SaveScoreResponse(
        id = this.id,
        wordUsed = this.wordUsed,
        score = this.score
    )