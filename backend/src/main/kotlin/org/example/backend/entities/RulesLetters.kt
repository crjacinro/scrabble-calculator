package org.example.backend.entities

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "rules_letters")
data class RulesLetters(
    @Id
    @Column(name = "letter", nullable = false)
    val letter: Char,

    @Column(name = "score", nullable = false)
    var score: Int
)
