package com.agri.controller;

import com.agri.model.SalesOrder;
import com.agri.repository.SalesOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales-orders")
@CrossOrigin(origins = "*")
public class SalesOrderController {

    @Autowired
    private SalesOrderRepository repository;

    @GetMapping
    public List<SalesOrder> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public SalesOrder create(@RequestBody SalesOrder order) {
        return repository.save(order);
    }

    @PutMapping("/{id}")
    public SalesOrder update(@PathVariable String id, @RequestBody SalesOrder order) {
        order.setId(id);
        return repository.save(order);
    }
}
