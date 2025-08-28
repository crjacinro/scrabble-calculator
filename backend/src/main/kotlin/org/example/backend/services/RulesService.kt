package org.example.backend.services

import org.example.backend.entities.LetterRule
import org.example.backend.repositories.RulesRepository
import org.springframework.stereotype.Service

@Service
class RulesService(private val db: RulesRepository) {
    fun findAllLetterRules(): List<LetterRule> = db.findAll().toList()
}