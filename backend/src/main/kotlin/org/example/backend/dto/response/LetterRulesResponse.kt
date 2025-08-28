package org.example.backend.dto.response

import org.example.backend.entities.RulesLetters

data class LetterRulesResponse(
    val scoresPerLetter: Map<Char, Int>
)

fun List<RulesLetters>.toResponse(): LetterRulesResponse {
    val scoresMap = mutableMapOf<Char, Int>()

    this.forEach { rule -> scoresMap[rule.letter] = rule.score }

    return LetterRulesResponse(scoresMap)
}
