package com.example.turism.service;
import com.example.turism.model.Restaurant;

import java.util.List;

public interface RestaurantService {
    public Restaurant saveRestaurant(Restaurant restaurant);
    public List<Restaurant> getAllRestaurante();
    public List<Restaurant> getAllRestauranteFiltered(String categorie);
    public List<Restaurant> getAllRestauranteFilteredByOras(String oras);
    public Restaurant findByOra(String oras, String categorie, int ora);
    public Restaurant getRandomRestaurantFilteredByCityAndCategory(String oras, String categorie);
    public Restaurant getRandomRestaurantFilteredByCityAndCategory2(String oras, String categorie, int ora);
    public void deleteRestaurantById(int id);
}
