package com.agri.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class SalesOrder {

    @Id
    private String id;
    private String orderNumber;
    private String timestamp;
    private String triggerType;
    private String telemetryRule;
    private String telemetrySensor;
    private String soilMoisture;
    private String customerName;
    private String landDetails;
    private String serviceSku;
    private String serviceDescription;
    private Double amount;
    private String rateInfo;
    private String status;
    private String paymentMethod;
    private String invoiceNumber;
    private Double ndviScore;

    @Lob
    private String fieldSnapshotUrl;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getTriggerType() { return triggerType; }
    public void setTriggerType(String triggerType) { this.triggerType = triggerType; }

    public String getTelemetryRule() { return telemetryRule; }
    public void setTelemetryRule(String telemetryRule) { this.telemetryRule = telemetryRule; }

    public String getTelemetrySensor() { return telemetrySensor; }
    public void setTelemetrySensor(String telemetrySensor) { this.telemetrySensor = telemetrySensor; }

    public String getSoilMoisture() { return soilMoisture; }
    public void setSoilMoisture(String soilMoisture) { this.soilMoisture = soilMoisture; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getLandDetails() { return landDetails; }
    public void setLandDetails(String landDetails) { this.landDetails = landDetails; }

    public String getServiceSku() { return serviceSku; }
    public void setServiceSku(String serviceSku) { this.serviceSku = serviceSku; }

    public String getServiceDescription() { return serviceDescription; }
    public void setServiceDescription(String serviceDescription) { this.serviceDescription = serviceDescription; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getRateInfo() { return rateInfo; }
    public void setRateInfo(String rateInfo) { this.rateInfo = rateInfo; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public Double getNdviScore() { return ndviScore; }
    public void setNdviScore(Double ndviScore) { this.ndviScore = ndviScore; }

    public String getFieldSnapshotUrl() { return fieldSnapshotUrl; }
    public void setFieldSnapshotUrl(String fieldSnapshotUrl) { this.fieldSnapshotUrl = fieldSnapshotUrl; }
}
