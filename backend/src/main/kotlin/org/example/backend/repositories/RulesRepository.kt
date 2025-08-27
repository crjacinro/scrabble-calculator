package org.example.backend.repositories

import org.example.backend.entities.RulesLetters
import org.springframework.data.jpa.repository.JpaRepository

interface RulesRepository : JpaRepository<RulesLetters, String>