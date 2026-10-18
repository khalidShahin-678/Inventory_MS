package com.example.Inventory_API.model;


import jakarta.persistence.*;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "items")
@EntityListeners(AuditingEntityListener.class)
public class Item {
    // One-to-Many relation between Item and Transactions
    @OneToMany(mappedBy = "item")
    private List<Transaction> transactions;

    // Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;

    //
    @Column(name = "ar_name")
    private String arName;
    @Column(name = "en_name")
    private String enName;
    @Column(name = "category")
    private Category category;
    @Column(name = "code")
    private String code;
    @Column(name = "quantity")
    private Long quantity;
    //
    @CreatedDate
    @Column(updatable = false , nullable = false , name= "created_at")
    private LocalDateTime createdAt;
    //

    public Item() {
    }

    public Item(Long id, String arName,String enName,String code, Category category) {
        this.id = id;
        this.arName = arName;
        this.enName = enName;
        this.code = code;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getArName() {
        return arName;
    }

    public void setArName(String arName) {
        this.arName = arName;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
}
