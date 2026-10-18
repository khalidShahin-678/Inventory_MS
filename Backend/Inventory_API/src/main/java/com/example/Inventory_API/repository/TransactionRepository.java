package com.example.Inventory_API.repository;

import com.example.Inventory_API.model.OperationType;
import com.example.Inventory_API.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long>{
    List<Transaction> findByItemId(Long itemId);

    List<Transaction> findByType(OperationType type);

}
