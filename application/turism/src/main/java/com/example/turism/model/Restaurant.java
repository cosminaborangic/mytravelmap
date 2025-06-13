package com.example.turism.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Restaurant {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String name;
    private String tara;
    private String oras;
    private String categorie;
    private String tematica;
    private String address;
    private int ora_deschidere;
    private int ora_inchidere;
    private int pret;
    private int timp;
    private float rating;
    private int ora_propusa;
    public Restaurant() {
    }

    public String getTematica() {
        return tematica;
    }

    public void setTematica(String tematica) {
        this.tematica = tematica;
    }

    public String getTara() {
        return tara;
    }

    public void setTara(String tara) {
        this.tara = tara;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOras() {
        return oras;
    }

    public void setOras(String oras) {
        this.oras = oras;
    }

    public int getOra_deschidere() {
        return ora_deschidere;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public void setOra_deschidere(int ora_deschidere) {
        this.ora_deschidere = ora_deschidere;
    }

    public int getOra_inchidere() {
        return ora_inchidere;
    }

    public void setOra_inchidere(int ora_inchidere) {
        this.ora_inchidere = ora_inchidere;
    }

    public int getPret() {
        return pret;
    }

    public void setPret(int pret) {
        this.pret = pret;
    }

    public int getTimp() {
        return timp;
    }

    public void setTimp(int timp) {
        this.timp = timp;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getOra_propusa() {
        return ora_propusa;
    }

    public void setOra_propusa(int ora_propusa) {
        this.ora_propusa = ora_propusa;
    }
}
