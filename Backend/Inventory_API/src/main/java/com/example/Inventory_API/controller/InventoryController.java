package com.example.Inventory_API.controller;


import com.example.Inventory_API.dto.TransactionRequest;
import com.example.Inventory_API.model.Transaction;
import com.example.Inventory_API.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items/{id}")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class InventoryController {
    private InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService){
        this.inventoryService = inventoryService;
    }

    @PostMapping("/add")
    public Transaction add(@PathVariable(value = "id") Long itemId ,@Valid @RequestBody TransactionRequest request){
        return inventoryService.add(itemId,request);
    }

    @PostMapping("/withdraw")
    public Transaction withdraw (@PathVariable(value = "id") Long itemId ,@Valid @RequestBody TransactionRequest request){
        return inventoryService.withdraw(itemId,request);
    }

    @PostMapping("/adjust")
    public Transaction adjust(@PathVariable(value = "id") Long itemId ,@Valid @RequestBody TransactionRequest request){
        return inventoryService.adjust(itemId,request);
    }
}

