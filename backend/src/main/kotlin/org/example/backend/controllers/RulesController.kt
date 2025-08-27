package org.example.backend.controllers

import org.example.backend.dto.response.LetterRulesResponse
import org.example.backend.dto.response.toResponse
import org.example.backend.services.RulesService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RulesController(private val rulesService: RulesService) {
    @GetMapping("/rules")
    fun rulesIndex(): ResponseEntity<LetterRulesResponse> {
        val rules = rulesService.findAllLetterRules()

        return ResponseEntity.ok().body(rules.toResponse())
    }
}