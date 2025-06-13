package com.example.turism;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.turism.model.Tara;
import com.example.turism.repository.TaraRepository;
import com.example.turism.service.TaraServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

public class TaraServiceImplTest {

    @Mock
    private TaraRepository taraRepository;

    @InjectMocks
    private TaraServiceImpl taraService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveTara() {
        Tara tara = new Tara();
        when(taraRepository.save(tara)).thenReturn(tara);

        Tara savedTara = taraService.saveTara(tara);

        assertNotNull(savedTara);
        verify(taraRepository, times(1)).save(tara);
    }

    @Test
    public void testGetAllTari() {
        List<Tara> tari = new ArrayList<>();
        when(taraRepository.findAll()).thenReturn(tari);

        List<Tara> result = taraService.getAllTari();

        assertEquals(tari, result);
        verify(taraRepository, times(1)).findAll();
    }

    @Test
    public void testGetAllTariFiltered() {
        List<Tara> tari = new ArrayList<>();
        when(taraRepository.findAllByName("test")).thenReturn(tari);

        List<Tara> result = taraService.getAllTariFiltered("test");

        assertEquals(tari, result);
        verify(taraRepository, times(1)).findAllByName("test");
    }

    @Test
    public void testGetAllTariFilteredByContinent() {
        List<Tara> tari = new ArrayList<>();
        when(taraRepository.findAllByContinent("test")).thenReturn(tari);

        List<Tara> result = taraService.getAllTariFilteredByContinent("test");

        assertEquals(tari, result);
        verify(taraRepository, times(1)).findAllByContinent("test");
    }

}

