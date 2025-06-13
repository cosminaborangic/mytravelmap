package com.example.turism.service;
import com.example.turism.model.Obiectiv;

import java.util.List;

public interface ObiectivService {
    public Obiectiv saveObiectiv(Obiectiv obiectiv);
    public List<Obiectiv> getAllObiective();
    public List<Obiectiv> getAllObiectiveFiltered(String categorie);
    public List<Obiectiv> getItinerariu(String oras, int oraStart, int oraEnd, int pretMaxim);
    public List<Obiectiv> getItinerariu2(String oras, int oraStart, int pauza, int oraEnd, int pretMaxim);
    public List<List<Obiectiv>> getItinerariuCuZile(String oras, int oraStart, int pauza, int oraEnd, int pretMaxim, int zile);
    public List<List<Obiectiv>> getItinerariuCuZile2(String oras, int oraStart, int oraEnd, int pretMaxim, int zile);
    public List<Obiectiv> getAllObiectiveFilteredByOras(String oras);
    public void deleteObiectivById(int id);
    public List<Obiectiv> getAllObiectiveFiltered2(List<String> categorii);

}
