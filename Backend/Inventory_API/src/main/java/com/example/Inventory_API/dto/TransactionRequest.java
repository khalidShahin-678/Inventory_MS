package com.example.Inventory_API.dto;

import com.example.Inventory_API.model.OperationType;
import jakarta.validation.constraints.Positive;

public record   TransactionRequest(
        @Positive(message = "Quantity must be positive")
        Long quantity){}
