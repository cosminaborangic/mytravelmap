package com.example.turism.controller;

import com.example.turism.model.Restaurant;
import com.example.turism.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurant")
@CrossOrigin
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;
    @PostMapping("/add")
    public String add(@RequestBody Restaurant restaurant){
        restaurantService.saveRestaurant(restaurant);
        return "New restaurant is added";
    }
    @GetMapping("/getAll")
    public List<Restaurant> getAllRestaurante(){
        return restaurantService.getAllRestaurante();
    }
    @GetMapping("/getAllByCategorie")
    public List<Restaurant> getAllRestauranteFiltered(@RequestParam String categorie){
        return restaurantService.getAllRestauranteFiltered(categorie);
    }
    @GetMapping("/getAllByOras")
    public List<Restaurant> getAllRestauranteFilteredByOras(@RequestParam String oras){
        return restaurantService.getAllRestauranteFilteredByOras(oras);
    }
    @GetMapping("/getFindByOra")
    public Restaurant findByOra(@RequestParam String oras, @RequestParam String categorie, @RequestParam int ora){
        return restaurantService.findByOra(oras, categorie,  ora);
    }
    @GetMapping("/getRamdonByCategorie")
    public Restaurant getRandomRestaurantFilteredByCityAndCategory(@RequestParam String oras, @RequestParam String categorie){
        return restaurantService.getRandomRestaurantFilteredByCityAndCategory(oras, categorie);
    }
    @GetMapping("/getRamdonByCategorieAndOra")
    public Restaurant getRandomRestaurantFilteredByCityAndCategory2(@RequestParam String oras, @RequestParam String categorie, @RequestParam int ora){
        return restaurantService.getRandomRestaurantFilteredByCityAndCategory2(oras, categorie, ora);
    }
    @DeleteMapping("/delete")
    public String deleteRestaurant(@RequestParam int id) {
        restaurantService.deleteRestaurantById(id);
        return "Restaurant with ID " + id + " has been deleted";
    }






}
