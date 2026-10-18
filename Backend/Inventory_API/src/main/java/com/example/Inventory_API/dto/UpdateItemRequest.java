package com.example.Inventory_API.dto;

import com.example.Inventory_API.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record UpdateItemRequest(
        @Positive
        Long id,
        @NotBlank(message = "name cannot be empty")
        @NotNull(message = "name cannot be null")
        String arName,
        @NotBlank(message = "name cannot be empty")
        @NotNull(message = "name cannot be null")
        String enName,
        @NotBlank(message = "code cannot be blank")
        String code,
        Category category
) {
}
