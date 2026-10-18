package com.example.Inventory_API.repository;


import com.example.Inventory_API.model.Category;
import com.example.Inventory_API.model.Item;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item,Long> {
    List<Item> findByCategory(Category category);

    List<Item> findByArName(String arName);
    List<Item> findByEnName(String enName);

    List<Item> findByArNameContainingIgnoreCaseOrEnNameContainingIgnoreCase(String arName,String enName);
    boolean existsByArName(String arName);
    boolean existsByEnName(String enName);

    boolean existsByCode(String code);

    Optional<Item> findByCode(String code);


    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT i FROM Item i WHERE i.id = :id")
    Optional<Item> findByIdForUpdate(@Param("id") Long id);
}
