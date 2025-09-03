package com.zuhlke.backend.services

import com.zuhlke.backend.entities.LetterRule
import com.zuhlke.backend.repositories.RulesRepository
import org.springframework.stereotype.Service

@Service
class RulesService(private val db: RulesRepository) {
    fun findAllLetterRules(): List<LetterRule> = db.findAll().toList()
}