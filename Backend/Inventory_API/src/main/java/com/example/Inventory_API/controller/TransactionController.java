package com.example.Inventory_API.controller;


import com.example.Inventory_API.model.Transaction;
import com.example.Inventory_API.service.TransactionService;
import jakarta.validation.constraints.Positive;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class TransactionController {
    private TransactionService transactionService;

    public TransactionController (TransactionService transactionService){
        this.transactionService = transactionService;
    }

    @GetMapping("/items/transactions")
    public List<Transaction> findAll(){
        return transactionService.findAll();
    }

    @GetMapping("/items/transactions/{id}")
    public Transaction findById(@PathVariable Long id){
        return transactionService.findById(id);
    }

    @GetMapping("/items/{itemId}/transactions")
    public List<Transaction> findByItemId(@PathVariable @Positive Long itemId){
        return transactionService.findByItemId(itemId);
    }

}
