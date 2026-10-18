package com.example.Inventory_API.service;


import com.example.Inventory_API.exception.TransactionNotFoundException;
import com.example.Inventory_API.model.OperationType;
import com.example.Inventory_API.model.Transaction;
import com.example.Inventory_API.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private TransactionRepository transactionRepository;

    public TransactionService (TransactionRepository transactionRepository){
        this.transactionRepository = transactionRepository;
    }


    public Transaction findById(Long id){
        return transactionRepository.findById(id)
                .orElseThrow(()-> new TransactionNotFoundException("Transaction not found with Id :"+ id));
    }

    public List<Transaction> findByItemId(Long itemId){
        return transactionRepository.findByItemId(itemId);
    }

    public List<Transaction> findByType(OperationType type){
        return transactionRepository.findByType(type);
    }

    public List<Transaction> findAll(){
        return transactionRepository.findAll();
    }
}
