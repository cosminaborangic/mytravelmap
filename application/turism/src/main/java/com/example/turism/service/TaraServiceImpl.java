package com.example.turism.service;

import com.example.turism.model.Tara;
import com.example.turism.repository.TaraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaraServiceImpl implements TaraService{
    @Autowired
    private TaraRepository taraRepository;

    @Override
    public Tara saveTara(Tara tara) {
        return taraRepository.save(tara);
    }

    @Override
    public List<Tara> getAllTari() {
        return taraRepository.findAll();
    }

    @Override
    public List<Tara> getAllTariFiltered(String name) {
        return taraRepository.findAllByName(name);
    }
    public List<Tara> getAllTariFilteredByContinent(String continent){
        return taraRepository.findAllByContinent(continent);
    }

}