package com.zuhlke.backend.dto.response.errors

data class ErrorResponse(
    val status: Int,
    val error: String,
    val message: String?,
    val path: String
)