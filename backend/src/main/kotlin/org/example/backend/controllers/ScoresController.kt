package org.example.backend.controllers

import org.example.backend.dto.request.ScoresRequest
import org.example.backend.dto.request.toEntity
import org.example.backend.dto.response.SaveScoreResponse
import org.example.backend.dto.response.TopScoresResponse
import org.example.backend.dto.response.toResponse
import org.example.backend.services.ScoresService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
class ScoresController(private val scoreService: ScoresService) {
    @GetMapping("/scores")
    fun scoresIndex(
        @RequestParam(name = "top", defaultValue = "10") topK: Int
    ): ResponseEntity<TopScoresResponse> {
        val topScores = scoreService.getHighestScores(topK)

        return ResponseEntity.ok().body(topScores.toResponse())
    }

    @PostMapping("/scores")
    fun post(@RequestBody request: ScoresRequest): ResponseEntity<SaveScoreResponse> {
        val savedScore = scoreService.save(request.toEntity())

        return ResponseEntity.created(URI("/scores/${savedScore.id}")).body(savedScore.toResponse())
    }
}