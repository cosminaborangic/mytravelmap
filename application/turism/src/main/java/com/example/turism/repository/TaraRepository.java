package com.example.turism.repository;



import com.example.turism.model.Tara;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaraRepository extends JpaRepository<Tara, Integer>{
    List<Tara> findAllByName(String name);
    List<Tara> findAllByContinent(String categorie);
}