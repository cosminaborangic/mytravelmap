package com.example.turism;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.turism.model.Obiectiv;
import com.example.turism.repository.ObiectivRepository;
import com.example.turism.service.ObiectivServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

public class ObiectivServiceImplTest {

    @Mock
    private ObiectivRepository obiectivRepository;

    @InjectMocks
    private ObiectivServiceImpl obiectivService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveObiectiv() {
        Obiectiv obiectiv = new Obiectiv();
        when(obiectivRepository.save(obiectiv)).thenReturn(obiectiv);

        Obiectiv savedObiectiv = obiectivService.saveObiectiv(obiectiv);

        assertNotNull(savedObiectiv);
        verify(obiectivRepository, times(1)).save(obiectiv);
    }

    @Test
    public void testGetAllObiective() {
        List<Obiectiv> obiective = new ArrayList<>();
        when(obiectivRepository.findAll()).thenReturn(obiective);

        List<Obiectiv> result = obiectivService.getAllObiective();

        assertEquals(obiective, result);
        verify(obiectivRepository, times(1)).findAll();
    }

    @Test
    public void testGetAllObiectiveFiltered() {
        List<Obiectiv> obiective = new ArrayList<>();
        when(obiectivRepository.findAllByCategorie("test")).thenReturn(obiective);

        List<Obiectiv> result = obiectivService.getAllObiectiveFiltered("test");

        assertEquals(obiective, result);
        verify(obiectivRepository, times(1)).findAllByCategorie("test");
    }

    @Test
    public void testGetAllObiectiveFilteredByOras() {
        List<Obiectiv> obiective = new ArrayList<>();
        when(obiectivRepository.findAllByOras("test")).thenReturn(obiective);

        List<Obiectiv> result = obiectivService.getAllObiectiveFilteredByOras("test");

        assertEquals(obiective, result);
        verify(obiectivRepository, times(1)).findAllByOras("test");
    }

    @Test
    public void testDeleteObiectivById() {
        doNothing().when(obiectivRepository).deleteById(1);

        obiectivService.deleteObiectivById(1);

        verify(obiectivRepository, times(1)).deleteById(1);
    }
}
