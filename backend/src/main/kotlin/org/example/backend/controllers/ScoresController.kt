package org.example.backend.controllers

import org.example.backend.dto.response.TopScoresResponse
import org.example.backend.dto.response.toResponse
import org.example.backend.services.ScoresService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ScoresController(private val scoreService: ScoresService) {
    @GetMapping("/scores")
    fun scoresIndex(): ResponseEntity<TopScoresResponse> {
        val topScores = scoreService.getHighestScores()

        return ResponseEntity.ok().body(topScores.toResponse())
    }
}