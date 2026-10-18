package com.example.Inventory_API.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "transactions")
public class Transaction {
    // Many-to-one relation between Transactions and Item
    @ManyToOne
    @JoinColumn(name = "item_id")
    @JsonIgnore
    private Item item;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long id;

    @Column(name = "transaction_type")
    private OperationType type;


    @CreatedDate
    @Column(updatable = false,nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "transaction_quantity")
    private Long transactionQuantity;

    @Column(name = "quantity_before")
    private Long quantityBefore ;

    @Column(name = "quantity_after")
    private Long quantityAfter;

    public Transaction(){
    }

    public Long getId() {
        return id;
    }

    public OperationType getType() {
        return type;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public void setType(OperationType type) {
        this.type = type;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }



    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Long getTransactionQuantity() {
        return transactionQuantity;
    }

    public void setTransactionQuantity(Long transactionQuantity) {
        this.transactionQuantity = transactionQuantity;
    }

    public Long getQuantityBefore() {
        return quantityBefore;
    }

    public void setQuantityBefore(Long quantityBefore) {
        this.quantityBefore = quantityBefore;
    }

    public Long getQuantityAfter() {
        return quantityAfter;
    }

    public void setQuantityAfter(Long quantityAfter) {
        this.quantityAfter = quantityAfter;
    }
}
