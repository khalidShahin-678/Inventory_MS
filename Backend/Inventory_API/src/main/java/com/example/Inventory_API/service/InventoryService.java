package com.example.Inventory_API.service;

import com.example.Inventory_API.dto.TransactionRequest;
import com.example.Inventory_API.exception.InsufficientQuantityException;
import com.example.Inventory_API.exception.ItemNotFoundException;
import com.example.Inventory_API.model.Item;
import com.example.Inventory_API.model.OperationType;
import com.example.Inventory_API.model.Transaction;
import com.example.Inventory_API.repository.ItemRepository;
import com.example.Inventory_API.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;


@Service
public class InventoryService {
    private final TransactionRepository transactionRepository;
    private final ItemRepository itemRepository;

    public InventoryService (TransactionRepository transactionRepository, ItemRepository itemRepository){
        this.transactionRepository = transactionRepository;
        this.itemRepository = itemRepository;
    }

    @Transactional
    public Transaction withdraw(Long itemId,TransactionRequest request){
        Item item = itemRepository.findByIdForUpdate(itemId).orElseThrow(()-> new ItemNotFoundException("Item not found with id:" + itemId));

        if(request.quantity() > item.getQuantity()){
            throw new InsufficientQuantityException("Your request (" + request.quantity() + ") exceed available stock ("+ item.getQuantity()+")");
        }

        Transaction transaction = new Transaction();
        transaction.setType(OperationType.WITHDRAW);
        transaction.setTransactionQuantity(request.quantity());

        transaction.setItem(item);
        transaction.setQuantityBefore(item.getQuantity());

        item.setQuantity(item.getQuantity() - request.quantity());
        transaction.setQuantityAfter(item.getQuantity());


        itemRepository.save(item);
        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction add(Long itemId , TransactionRequest request){

        // check if item exist
        Item item = itemRepository.findByIdForUpdate(itemId)
                .orElseThrow(()-> new ItemNotFoundException("Item not found with Id :" + itemId));

        Transaction transaction = new Transaction();
        transaction.setType(OperationType.ADD);
        transaction.setTransactionQuantity(request.quantity());

        transaction.setItem(item);
        transaction.setQuantityBefore(item.getQuantity());

        item.setQuantity(request.quantity() + item.getQuantity());
        transaction.setQuantityAfter(item.getQuantity());

        itemRepository.save(item);
        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction adjust(Long itemId,TransactionRequest request){
        Item item = itemRepository.findByIdForUpdate(itemId)
                .orElseThrow(()-> new ItemNotFoundException("Item not found with Id :" + itemId));

        Transaction transaction = new Transaction();
        transaction.setType(OperationType.ADJUST);
        transaction.setTransactionQuantity(request.quantity());

        transaction.setItem(item);
        transaction.setQuantityBefore(item.getQuantity());

        item.setQuantity(request.quantity());
        transaction.setQuantityAfter(item.getQuantity());

        itemRepository.save(item);
        return transactionRepository.save(transaction);
    }
}
