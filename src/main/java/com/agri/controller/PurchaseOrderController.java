package com.agri.controller;

import com.agri.model.PurchaseOrder;
import com.agri.repository.PurchaseOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase-orders")
@CrossOrigin(origins = "*")
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderRepository repository;

    @GetMapping
    public List<PurchaseOrder> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public PurchaseOrder create(@RequestBody PurchaseOrder order) {
        return repository.save(order);
    }

    @PutMapping("/{id}")
    public PurchaseOrder update(@PathVariable String id, @RequestBody PurchaseOrder order) {
        order.setId(id);
        return repository.save(order);
    }
}
