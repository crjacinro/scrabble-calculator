package com.zuhlke.backend.dto.response

import com.zuhlke.backend.entities.LetterRule

data class LetterRulesResponse(
    val scoresPerLetter: Map<Char, Int>
)

fun List<LetterRule>.toResponse(): LetterRulesResponse {
    val scoresMap = mutableMapOf<Char, Int>()

    this.forEach { rule -> scoresMap[rule.letter] = rule.score }

    return LetterRulesResponse(scoresMap)
}
