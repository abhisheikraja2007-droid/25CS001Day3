package com.agri.model;

import jakarta.persistence.*;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    // Type: "GOODS" or "SERVICE"
    private String type;
    
    private Double salesPrice;
    private Double cost;
    private String category;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Double getSalesPrice() { return salesPrice; }
    public void setSalesPrice(Double salesPrice) { this.salesPrice = salesPrice; }
    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
