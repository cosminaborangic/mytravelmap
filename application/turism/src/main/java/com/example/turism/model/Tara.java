package com.example.turism.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Tara {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String continent;
    private String descriere;
    private String gastronomie;
    private String siguranta;
    private String reguli;

    public Tara() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContinent() {
        return continent;
    }

    public void setContinent(String continent) {
        this.continent = continent;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getGastronomie() {
        return gastronomie;
    }

    public void setGastronomie(String gastronomie) {
        this.gastronomie = gastronomie;
    }

    public String getSiguranta() {
        return siguranta;
    }

    public void setSiguranta(String siguranta) {
        this.siguranta = siguranta;
    }

    public String getReguli() {
        return reguli;
    }

    public void setReguli(String reguli) {
        this.reguli = reguli;
    }
}