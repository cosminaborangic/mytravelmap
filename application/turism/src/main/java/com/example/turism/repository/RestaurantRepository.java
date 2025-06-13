package com.example.turism.repository;

import com.example.turism.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{
    List<Restaurant> findAllByCategorie(String categorie);
    List<Restaurant> findAllByOras(String oras);
    List<Restaurant> findAllByOrasAndCategorie(String oras, String categorie);
}