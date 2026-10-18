package com.example.Inventory_API.controller;


import com.example.Inventory_API.dto.CreateItemRequest;
import com.example.Inventory_API.dto.UpdateItemRequest;
import com.example.Inventory_API.model.Item;
import com.example.Inventory_API.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:3000/")
public class ItemController {

    private final ItemService itemService;

    public ItemController (ItemService itemService){
        this.itemService = itemService;
    }

    // Get methods

    @GetMapping("/items/{id}")
    public Item findById(@PathVariable Long id){
        return itemService.findById(id);
    }

    @GetMapping("/items")
    public List<Item> findByName(@RequestParam(required = false) String name){
        return itemService.findByName(name);
    }

    // Post method

    @PostMapping("/items")
    @ResponseStatus(HttpStatus.CREATED)
    public Item create(@Valid @RequestBody CreateItemRequest request){
        return itemService.create(request);
    }

    // Put method
    @PutMapping("/items")
    public Item update(@Valid @RequestBody UpdateItemRequest request){
        return itemService.update(request);
    }
}
