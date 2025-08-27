package org.example.backend.services

import org.example.backend.entities.RulesLetters
import org.example.backend.repositories.RulesRepository
import org.springframework.stereotype.Service

@Service
class RulesService(private val db: RulesRepository) {
    fun findAllLetterRules(): List<RulesLetters> = db.findAll().toList()
}