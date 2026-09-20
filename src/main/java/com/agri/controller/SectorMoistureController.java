package com.agri.controller;

import com.agri.model.SectorMoisture;
import com.agri.repository.SectorMoistureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sectors")
@CrossOrigin(origins = "*")
public class SectorMoistureController {

    @Autowired
    private SectorMoistureRepository repository;

    @GetMapping
    public List<SectorMoisture> getAll() {
        return repository.findAll();
    }
}
