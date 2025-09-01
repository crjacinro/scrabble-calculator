package org.example.backend.dto.response

import org.example.backend.entities.WordScore

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
