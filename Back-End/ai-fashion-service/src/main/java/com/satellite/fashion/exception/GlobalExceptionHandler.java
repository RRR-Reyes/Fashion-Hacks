package com.satellite.fashion.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles @Valid validation failures (e.g. blank imageUrl)
     * Returns: 400 with field-level error messages
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(Map.of(
                "error", "Validation failed",
                "fields", fieldErrors,
                "timestamp", Instant.now().toString()
        ));
    }

    /**
     * Handles failures from OpenAI or Unsplash API calls
     * Returns: 502 Bad Gateway (upstream dependency failed)
     */
    @ExceptionHandler(ExternalApiException.class)
    public ResponseEntity<Map<String, Object>> handleExternalApiException(ExternalApiException ex) {
        log.error("External API failure: {}", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of(
                "error", "External API error",
                "message", ex.getMessage(),
                "timestamp", Instant.now().toString()
        ));
    }

    /**
     * Catch-all for anything unexpected
     * Returns: 500
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        log.error("Unexpected error", ex);

        return ResponseEntity.internalServerError().body(Map.of(
                "error", "Internal server error",
                "message", ex.getMessage(),
                "timestamp", Instant.now().toString()
        ));
    }
}
