package com.zuhlke.backend.dto.response

import com.zuhlke.backend.entities.WordScore

data class TopScoresResponse(
    val topScores: List<TopScore>
)

data class TopScore(
    val wordUsed: String,
    val score: Int,
    val timestamp: String,
)

fun List<WordScore>.toResponse(): TopScoresResponse {
    val scores = this.map { score ->
        TopScore(score.wordUsed, score.score, score.playedAt.toString())
    }

    return TopScoresResponse(topScores = scores)
}
