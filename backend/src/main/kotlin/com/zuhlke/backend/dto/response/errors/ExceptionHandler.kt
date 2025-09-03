package com.zuhlke.backend.dto.response.errors

import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.NoHandlerFoundException

@RestControllerAdvice
class ExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(
        ex: MethodArgumentNotValidException,
        request: HttpServletRequest
    ): ResponseEntity<ErrorResponse> {
        val firstError = ex.bindingResult.fieldErrors.firstOrNull()
        val message = firstError?.defaultMessage ?: "Invalid request"

        val response = ErrorResponse(
            status = HttpStatus.BAD_REQUEST.value(),
            error = HttpStatus.BAD_REQUEST.reasonPhrase,
            message = message,
            path = request.requestURI
        )
        return ResponseEntity(response, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(NoHandlerFoundException::class)
    fun handleNoHandlerFound(
        request: HttpServletRequest
    ): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.NOT_FOUND.value(),
            error = HttpStatus.NOT_FOUND.reasonPhrase,
            message = "Endpoint ${request.requestURI} not found",
            path = request.requestURI
        )
        return ResponseEntity(response, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleNotFound(
        ex: IllegalArgumentException,
        request: HttpServletRequest
    ): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.BAD_REQUEST.value(),
            error = HttpStatus.BAD_REQUEST.reasonPhrase,
            message = ex.message,
            path = request.requestURI
        )
        return ResponseEntity(response, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(Exception::class)
    fun handleGeneralError(
        request: HttpServletRequest
    ): ResponseEntity<ErrorResponse> {
        val response = ErrorResponse(
            status = HttpStatus.INTERNAL_SERVER_ERROR.value(),
            error = HttpStatus.INTERNAL_SERVER_ERROR.reasonPhrase,
            message = "Something went wrong, please try again later.",
            path = request.requestURI
        )
        return ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}