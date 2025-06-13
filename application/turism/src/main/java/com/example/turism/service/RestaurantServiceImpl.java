package com.example.turism.service;

import com.example.turism.model.Restaurant;
import com.example.turism.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class RestaurantServiceImpl implements RestaurantService{
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurante() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> getAllRestauranteFiltered(String categorie) {
        return restaurantRepository.findAllByCategorie(categorie);
    }

    @Override
    public List<Restaurant> getAllRestauranteFilteredByOras(String oras) {
        return restaurantRepository.findAllByOras(oras);
    }

    @Override
    public Restaurant findByOra(String oras, String categorie, int ora) {
        List<Restaurant> restauranteByOras = restaurantRepository.findAllByOras(oras);
        List<Restaurant> restauranteByCategorie = restaurantRepository.findAllByCategorie(categorie);
        List<Restaurant> restauranteComune = new ArrayList<>();

        for (Restaurant restaurantOras : restauranteByOras) {
            if (restauranteByCategorie.contains(restaurantOras)) {
                restauranteComune.add(restaurantOras);
            }
        }

        for (Restaurant restaurant : restauranteComune) {
            if (restaurant.getOra_deschidere() <= ora && restaurant.getOra_inchidere() >= ora) {
                restaurant.setOra_propusa(ora);
                return restaurant;
            }
        }

        return null;
    }
    @Override
    public Restaurant getRandomRestaurantFilteredByCityAndCategory(String oras, String categorie) {
        List<Restaurant> restauranteFiltrate = restaurantRepository.findAllByOrasAndCategorie(oras, categorie);
        if (restauranteFiltrate.isEmpty()) {
            return null; // Nu există restaurante care să corespundă criteriilor
        } else {
            Random random = new Random();
            int index = random.nextInt(restauranteFiltrate.size());
            return restauranteFiltrate.get(index);
        }
    }

    @Override
    public Restaurant getRandomRestaurantFilteredByCityAndCategory2(String oras, String categorie, int ora) {
        List<Restaurant> restauranteFiltrate = restaurantRepository.findAllByOrasAndCategorie(oras, categorie);
        if (restauranteFiltrate.isEmpty()) {
            return null; // Nu există restaurante care să corespundă criteriilor
        } else {
            Random random = new Random();
            int index = random.nextInt(restauranteFiltrate.size());
            Restaurant restaurant = restauranteFiltrate.get(index);

            // Verificare dacă restaurantul este deschis la ora specificată
            if (restaurant.getOra_deschidere() <= ora && restaurant.getOra_inchidere() >= ora) {
                restaurant.setOra_propusa(ora);
                return restaurant;
            } else {
                // În caz contrar, întoarce null pentru a indica că restaurantul nu este deschis la ora specificată
                return null;
            }
        }
    }


    @Override
    public void deleteRestaurantById(int id) {
        restaurantRepository.deleteById(id);
    }
}