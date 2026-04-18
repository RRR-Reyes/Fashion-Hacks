package com.satellite.fashion.service;

import com.satellite.fashion.dto.AnalyzeResponse;
import com.satellite.fashion.exception.ExternalApiException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.*;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OpenAIServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private OpenAIService openAIService;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(openAIService, "apiKey", "test-key");
        ReflectionTestUtils.setField(openAIService, "apiUrl", "https://api.openai.com/v1/chat/completions");
        ReflectionTestUtils.setField(openAIService, "model", "gpt-4o");
    }

    @Test
    void analyzeImage_successfulResponse_returnsAnalysis() {
        // Arrange - mock the OpenAI response shape
        String mockResponse = """
            {
              "choices": [{
                "message": {
                  "content": "{\\"colors\\": [\\"#1a1a2e\\", \\"#ff6b35\\", \\"#f7c59f\\"], \\"textures\\": [\\"matte\\", \\"iridescent\\"], \\"vibe\\": \\"cosmic warm desert dusk\\"}"
                }
              }]
            }
            """;

        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(), eq(String.class)))
                .thenReturn(ResponseEntity.ok(mockResponse));

        // Act
        AnalyzeResponse result = openAIService.analyzeImage("https://apod.nasa.gov/test.jpg");

        // Assert
        assertThat(result.getColors()).hasSize(3).contains("#1a1a2e", "#ff6b35", "#f7c59f");
        assertThat(result.getTextures()).hasSize(2).contains("matte", "iridescent");
        assertThat(result.getVibe()).isEqualTo("cosmic warm desert dusk");
    }

    @Test
    void analyzeImage_apiThrowsException_throwsExternalApiException() {
        // Arrange
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(), eq(String.class)))
                .thenThrow(new RuntimeException("Connection refused"));

        // Act & Assert
        assertThatThrownBy(() -> openAIService.analyzeImage("https://apod.nasa.gov/test.jpg"))
                .isInstanceOf(ExternalApiException.class)
                .hasMessageContaining("Failed to analyze image with OpenAI");
    }
}
