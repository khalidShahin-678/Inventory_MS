package com.example.Inventory_API.service;

import com.example.Inventory_API.dto.CreateItemRequest;
import com.example.Inventory_API.dto.UpdateItemRequest;
import com.example.Inventory_API.exception.ItemAlreadyExistsException;
import com.example.Inventory_API.exception.ItemNotFoundException;
import com.example.Inventory_API.model.Category;
import com.example.Inventory_API.model.Item;
import com.example.Inventory_API.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
public class ItemService {
    private ItemRepository itemRepository;

    //
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }
    //

    //

    public List<Item> findAll(){
        return itemRepository.findAll();
    }

    public Item findById(Long id){
        return itemRepository.findById(id).orElseThrow(() -> new ItemNotFoundException("Item not found with id:" + id));
    }

    public List<Item> findByName(String name){

        if(name == null)return findAll();

        List<Item> foundItems = new ArrayList<>();

        foundItems = itemRepository.findByArNameContainingIgnoreCaseOrEnNameContainingIgnoreCase(name,name);

        if(foundItems.isEmpty())throw new ItemNotFoundException("Not items found with name :" + name);
        return foundItems;
    }

    public List<Item> findByCategory(Category category){
        List<Item> foundItems = itemRepository.findByCategory(category);
        if(foundItems.isEmpty())throw new ItemNotFoundException("Not items found with category :" + category);
        return foundItems;
    }

    //
    // create new Item
    //
    public Item create(CreateItemRequest request){
        // Check if it exists before
        if(itemRepository.existsByArName(request.arName())){
            throw new ItemAlreadyExistsException("Item already exist with arabic name:" + request.arName());
        }else if (itemRepository.existsByEnName(request.enName())){
            throw new ItemAlreadyExistsException("Item already exist with english name:" + request.enName());
        }else if(itemRepository.existsByCode(request.code()) && request.code() != null){
            throw new ItemAlreadyExistsException("Item already exist with code:" + request.code());
        }

        // Mapping request
        Item item = new Item();

        item.setArName(request.arName());
        item.setEnName(request.enName());
        item.setCode(request.code());
        item.setCategory(request.category());
        item.setQuantity(request.initialQuantity());


        return itemRepository.save(item);
    }

    //
    // Update existing Item
    //
    public Item update(UpdateItemRequest request){
        Item existingItem = itemRepository.findById(request.id()).orElseThrow(()-> new ItemNotFoundException("Item not found with id:"+ request.id()));

        existingItem.setArName(request.arName());
        existingItem.setEnName(request.enName());
        existingItem.setCode(request.code());
        existingItem.setCategory(request.category());

        return itemRepository.save(existingItem);

    }

}
