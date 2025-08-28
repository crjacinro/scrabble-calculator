package org.example.backend.dto.response

import org.example.backend.entities.WordScore

data class TopScoresResponse(
    val topScores: List<TopScore>
)

data class TopScore(
    val wordUsed: String,
    val score: Int,
)

fun List<WordScore>.toResponse(): TopScoresResponse {
    val scores = this.map { score ->
        TopScore(score.wordUsed, score.score)
    }

    return TopScoresResponse(topScores = scores)
}
