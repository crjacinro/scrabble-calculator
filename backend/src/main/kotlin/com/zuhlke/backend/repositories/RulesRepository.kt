package com.zuhlke.backend.repositories

import com.zuhlke.backend.entities.LetterRule
import org.springframework.data.jpa.repository.JpaRepository

interface RulesRepository : JpaRepository<LetterRule, String>