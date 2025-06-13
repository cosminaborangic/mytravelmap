package com.example.turism;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.turism.model.Restaurant;
import com.example.turism.repository.RestaurantRepository;
import com.example.turism.service.RestaurantServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

public class RestaurantServiceImplTest {

    @Mock
    private RestaurantRepository restaurantRepository;

    @InjectMocks
    private RestaurantServiceImpl restaurantService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveRestaurant() {
        Restaurant restaurant = new Restaurant();
        when(restaurantRepository.save(restaurant)).thenReturn(restaurant);

        Restaurant savedRestaurant = restaurantService.saveRestaurant(restaurant);

        assertNotNull(savedRestaurant);
        verify(restaurantRepository, times(1)).save(restaurant);
    }

    @Test
    public void testGetAllRestaurante() {
        List<Restaurant> restaurante = new ArrayList<>();
        when(restaurantRepository.findAll()).thenReturn(restaurante);

        List<Restaurant> result = restaurantService.getAllRestaurante();

        assertEquals(restaurante, result);
        verify(restaurantRepository, times(1)).findAll();
    }

    @Test
    public void testGetAllRestauranteFiltered() {
        List<Restaurant> restaurante = new ArrayList<>();
        when(restaurantRepository.findAllByCategorie("test")).thenReturn(restaurante);

        List<Restaurant> result = restaurantService.getAllRestauranteFiltered("test");

        assertEquals(restaurante, result);
        verify(restaurantRepository, times(1)).findAllByCategorie("test");
    }

    @Test
    public void testGetAllRestauranteFilteredByOras() {
        List<Restaurant> restaurante = new ArrayList<>();
        when(restaurantRepository.findAllByOras("test")).thenReturn(restaurante);

        List<Restaurant> result = restaurantService.getAllRestauranteFilteredByOras("test");

        assertEquals(restaurante, result);
        verify(restaurantRepository, times(1)).findAllByOras("test");
    }

    @Test
    public void testDeleteRestaurantById() {
        doNothing().when(restaurantRepository).deleteById(1);

        restaurantService.deleteRestaurantById(1);

        verify(restaurantRepository, times(1)).deleteById(1);
    }
}
