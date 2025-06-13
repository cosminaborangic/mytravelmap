package com.example.turism;


import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.turism.controller.ObiectivController;
import com.example.turism.model.Obiectiv;
import com.example.turism.service.ObiectivService;
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

public class ObiectivControllerTest {

    @Mock
    private ObiectivService obiectivService;

    @InjectMocks
    private ObiectivController obiectivController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(obiectivController).build();
    }

    @Test
    public void testAddObiectiv() throws Exception {
        Obiectiv obiectiv = new Obiectiv();
        when(obiectivService.saveObiectiv(any(Obiectiv.class))).thenReturn(obiectiv);

        mockMvc.perform(post("/obiectiv/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Test Obiectiv\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("New obiectiv is added"));
    }

    @Test
    public void testGetAllObiective() throws Exception {
        List<Obiectiv> obiective = new ArrayList<>();
        when(obiectivService.getAllObiective()).thenReturn(obiective);

        mockMvc.perform(get("/obiectiv/getAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetAllObiectiveFiltered() throws Exception {
        List<Obiectiv> obiective = new ArrayList<>();
        when(obiectivService.getAllObiectiveFiltered(anyString())).thenReturn(obiective);

        mockMvc.perform(get("/obiectiv/getAllByCategorie").param("categorie", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetAllObiectiveFiltered2() throws Exception {
        List<Obiectiv> obiective = new ArrayList<>();
        when(obiectivService.getAllObiectiveFiltered2(anyList())).thenReturn(obiective);

        mockMvc.perform(get("/obiectiv/getAllByCategorie2/test1,test2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetAllObiectiveFilteredByOras() throws Exception {
        List<Obiectiv> obiective = new ArrayList<>();
        when(obiectivService.getAllObiectiveFilteredByOras(anyString())).thenReturn(obiective);

        mockMvc.perform(get("/obiectiv/getAllByOras").param("oras", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetItinerariu() throws Exception {
        List<Obiectiv> itinerariu = new ArrayList<>();
        when(obiectivService.getItinerariu(anyString(), anyInt(), anyInt(), anyInt())).thenReturn(itinerariu);

        mockMvc.perform(get("/obiectiv/getItinerariu")
                        .param("oras", "test")
                        .param("oraStart", "9")
                        .param("oraEnd", "18")
                        .param("pretMaxim", "100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetItinerariu2() throws Exception {
        List<Obiectiv> itinerariu = new ArrayList<>();
        when(obiectivService.getItinerariu2(anyString(), anyInt(), anyInt(), anyInt(), anyInt())).thenReturn(itinerariu);

        mockMvc.perform(get("/obiectiv/getItinerariu2")
                        .param("oras", "test")
                        .param("oraStart", "9")
                        .param("pauza", "13")
                        .param("oraEnd", "18")
                        .param("pretMaxim", "100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetItinerariuCuZile() throws Exception {
        List<List<Obiectiv>> itinerariu = new ArrayList<>();
        when(obiectivService.getItinerariuCuZile(anyString(), anyInt(), anyInt(), anyInt(), anyInt(), anyInt())).thenReturn(itinerariu);

        mockMvc.perform(get("/obiectiv/getItinerariuCuZile")
                        .param("oras", "test")
                        .param("oraStart", "9")
                        .param("pauza", "13")
                        .param("oraEnd", "18")
                        .param("pretMaxim", "100")
                        .param("zile", "3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetItinerariuCuZile2() throws Exception {
        List<List<Obiectiv>> itinerariu = new ArrayList<>();
        when(obiectivService.getItinerariuCuZile2(anyString(), anyInt(), anyInt(), anyInt(), anyInt())).thenReturn(itinerariu);

        mockMvc.perform(get("/obiectiv/getItinerariuCuZile2")
                        .param("oras", "test")
                        .param("oraStart", "9")
                        .param("oraEnd", "18")
                        .param("pretMaxim", "100")
                        .param("zile", "3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testDeleteObiectiv() throws Exception {
        doNothing().when(obiectivService).deleteObiectivById(anyInt());

        mockMvc.perform(delete("/obiectiv/delete").param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Obiectiv with ID 1 has been deleted"));
    }
}
