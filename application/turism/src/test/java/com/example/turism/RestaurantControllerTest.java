package com.example.turism;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.turism.controller.RestaurantController;
import com.example.turism.model.Restaurant;
import com.example.turism.service.RestaurantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

public class RestaurantControllerTest {

    @Mock
    private RestaurantService restaurantService;

    @InjectMocks
    private RestaurantController restaurantController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(restaurantController).build();
    }

    @Test
    public void testAddRestaurant() throws Exception {
        Restaurant restaurant = new Restaurant();
        when(restaurantService.saveRestaurant(any(Restaurant.class))).thenReturn(restaurant);

        mockMvc.perform(post("/restaurant/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Test Restaurant\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("New restaurant is added"));
    }

    @Test
    public void testGetAllRestaurante() throws Exception {
        List<Restaurant> restaurante = new ArrayList<>();
        when(restaurantService.getAllRestaurante()).thenReturn(restaurante);

        mockMvc.perform(get("/restaurant/getAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetAllRestauranteFiltered() throws Exception {
        List<Restaurant> restaurante = new ArrayList<>();
        when(restaurantService.getAllRestauranteFiltered(anyString())).thenReturn(restaurante);

        mockMvc.perform(get("/restaurant/getAllByCategorie").param("categorie", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetAllRestauranteFilteredByOras() throws Exception {
        List<Restaurant> restaurante = new ArrayList<>();
        when(restaurantService.getAllRestauranteFilteredByOras(anyString())).thenReturn(restaurante);

        mockMvc.perform(get("/restaurant/getAllByOras").param("oras", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testDeleteRestaurant() throws Exception {
        doNothing().when(restaurantService).deleteRestaurantById(anyInt());

        mockMvc.perform(delete("/restaurant/delete").param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Restaurant with ID 1 has been deleted"));
    }
}

