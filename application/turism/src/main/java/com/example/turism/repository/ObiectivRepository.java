package com.example.turism.repository;

import com.example.turism.model.Obiectiv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ObiectivRepository extends JpaRepository<Obiectiv, Integer>{
    List<Obiectiv> findAllByCategorie(String categorie);
    List<Obiectiv> findAllByOras(String oras);
    List<Obiectiv> findAllByCategorieIn(List<String> categorii);
}
