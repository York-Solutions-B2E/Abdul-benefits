package com.benefits.backend.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.Map;

@RestController
@RequestMapping()
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, Object> healthCheck(){
        return Map.of(
                "status", "UP",
                "timestamp", OffsetDateTime.now(),
                "message", "Benefits backend is running!"
        );
    }


    @GetMapping("/")
    public Map<String, String> hello() {
        return Map.of(
                "message", "Hello from Benefits backend!"
        );
    }
}
