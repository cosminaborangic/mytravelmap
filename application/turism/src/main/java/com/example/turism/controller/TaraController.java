package com.example.turism.controller;

import com.example.turism.model.Tara;
import com.example.turism.service.TaraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tara")
@CrossOrigin
public class TaraController {
    @Autowired
    private TaraService taraService;
    @PostMapping("/add")
    public String add(@RequestBody Tara tara){
        taraService.saveTara(tara);
        return "New tara is added";
    }
    @GetMapping("/getAll")
    public List<Tara> getAllTari(){
        return taraService.getAllTari();
    }
    @GetMapping("/getAllByName")
    public List<Tara> getAllTariFiltered(@RequestParam String name){
        return taraService.getAllTariFiltered(name);
    }
    @GetMapping("/getAllByContinent")
    public List<Tara> getAllTariFilteredByContinent(@RequestParam String continent){
        return taraService.getAllTariFilteredByContinent(continent);
    }

}
