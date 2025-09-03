package com.zuhlke.backend.controllers

import com.zuhlke.backend.dto.response.LetterRulesResponse
import com.zuhlke.backend.dto.response.toResponse
import com.zuhlke.backend.services.RulesService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin(origins = ["http://localhost:3000"])
class RulesController(private val rulesService: RulesService) {
    @GetMapping("/rules")
    fun rulesIndex(): ResponseEntity<LetterRulesResponse> {
        val rules = rulesService.findAllLetterRules()

        return ResponseEntity.ok().body(rules.toResponse())
    }
}