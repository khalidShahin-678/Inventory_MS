package com.example.Inventory_API.dto;

import com.example.Inventory_API.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record CreateItemRequest(
        @NotNull(message = "The name cannot be null")
        @NotBlank(message = "The name cannot be empty")
        @Size(min = 4, max = 255, message = "The name must be between 3 and 255 characters")
        String arName,
        @Size(min = 4, max = 255, message = "The name must be between 3 and 255 characters")
        String enName,
        String code,
        @NotNull(message = "Category cannot be null")
        Category category,
        @PositiveOrZero(message = "Quantity must be positive or zero")
        Long initialQuantity
) {
}
