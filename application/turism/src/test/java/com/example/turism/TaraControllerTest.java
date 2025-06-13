package com.example.turism;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.turism.controller.TaraController;
import com.example.turism.model.Tara;
import com.example.turism.service.TaraService;
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

public class TaraControllerTest {

    @Mock
    private TaraService taraService;

    @InjectMocks
    private TaraController taraController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(taraController).build();
    }

    @Test
    public void testAddTara() throws Exception {
        Tara tara = new Tara();
        when(taraService.saveTara(any(Tara.class))).thenReturn(tara);

        mockMvc.perform(post("/tara/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Test Tara\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("New tara is added"));
    }

    @Test
    public void testGetAllTari() throws Exception {
        List<Tara> tari = new ArrayList<>();
        when(taraService.getAllTari()).thenReturn(tari);

        mockMvc.perform(get("/tara/getAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetAllTariFiltered() throws Exception {
        List<Tara> tari = new ArrayList<>();
        when(taraService.getAllTariFiltered(anyString())).thenReturn(tari);

        mockMvc.perform(get("/tara/getAllByName").param("name", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetAllTariFilteredByContinent() throws Exception {
        List<Tara> tari = new ArrayList<>();
        when(taraService.getAllTariFilteredByContinent(anyString())).thenReturn(tari);

        mockMvc.perform(get("/tara/getAllByContinent").param("continent", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

}
