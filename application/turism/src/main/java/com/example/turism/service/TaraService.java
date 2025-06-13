package com.example.turism.service;
import com.example.turism.model.Tara;

import java.util.List;

public interface TaraService {
    public Tara saveTara(Tara tara);
    public List<Tara> getAllTari();
    public List<Tara> getAllTariFiltered(String name);
    public List<Tara> getAllTariFilteredByContinent(String continent);

}