package com.agri.controller;

import com.agri.repository.ContactRepository;
import com.agri.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*") // Allow requests from the React dev server
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public Map<String, Object> dashboard() {
        Map<String, Object> data = new HashMap<>();
        data.put("contacts", contactRepository.findAll());
        data.put("products", productRepository.findAll());
        return data;
    }
}
