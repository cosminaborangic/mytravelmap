package com.example.turism.controller;

import com.example.turism.model.Obiectiv;
import com.example.turism.service.ObiectivService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/obiectiv")
@CrossOrigin
public class ObiectivController {
    @Autowired
    private ObiectivService obiectivService;
    @PostMapping("/add")
    public String add(@RequestBody Obiectiv obiectiv){
        obiectivService.saveObiectiv(obiectiv);
        return "New obiectiv is added";
    }
    @GetMapping("/getAll")
    public List<Obiectiv> getAllObiective(){
        return obiectivService.getAllObiective();
    }
    @GetMapping("/getAllByCategorie")
    public List<Obiectiv> getAllObiectiveFiltered(@RequestParam String categorie){
        return obiectivService.getAllObiectiveFiltered(categorie);
    }
    @GetMapping("/getAllByCategorie2/{categorii}")
    public List<Obiectiv> getAllObiectiveFiltered2(@PathVariable List<String> categorii) {
        return obiectivService.getAllObiectiveFiltered2(categorii);
    }
    @GetMapping("/getAllByOras")
    public List<Obiectiv> getAllObiectiveFilteredByOras(@RequestParam String oras){
        return obiectivService.getAllObiectiveFilteredByOras(oras);
    }
    @GetMapping("/getItinerariu")
    public List<Obiectiv> getItinerariu(@RequestParam String oras, @RequestParam int oraStart, @RequestParam int oraEnd,  @RequestParam int pretMaxim){
        return obiectivService.getItinerariu(oras, oraStart, oraEnd, pretMaxim);
    }
    @GetMapping("/getItinerariu2")
    public List<Obiectiv> getItinerariu2(@RequestParam String oras, @RequestParam int oraStart, @RequestParam int pauza, @RequestParam int oraEnd,  @RequestParam int pretMaxim){
        return obiectivService.getItinerariu2(oras, oraStart, pauza,oraEnd, pretMaxim);
    }
    @GetMapping("/getItinerariuCuZile")
    public List<List<Obiectiv>> getItinerariuCuZile(@RequestParam String oras, @RequestParam int oraStart, @RequestParam int pauza, @RequestParam int oraEnd,  @RequestParam int pretMaxim, @RequestParam int zile){
        return obiectivService.getItinerariuCuZile(oras, oraStart, pauza,oraEnd, pretMaxim, zile);
    }
    @GetMapping("/getItinerariuCuZile2")
    public List<List<Obiectiv>> getItinerariuCuZile2(@RequestParam String oras, @RequestParam int oraStart, @RequestParam int oraEnd,  @RequestParam int pretMaxim, @RequestParam int zile){
        return obiectivService.getItinerariuCuZile2(oras, oraStart, oraEnd, pretMaxim, zile);
    }
    @DeleteMapping("/delete")
    public String deleteObiectiv(@RequestParam int id) {
        obiectivService.deleteObiectivById(id);
        return "Obiectiv with ID " + id + " has been deleted";
    }





}
