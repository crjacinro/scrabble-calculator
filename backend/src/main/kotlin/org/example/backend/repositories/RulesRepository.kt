package org.example.backend.repositories

import org.example.backend.entities.LetterRule
import org.springframework.data.jpa.repository.JpaRepository

interface RulesRepository : JpaRepository<LetterRule, String>