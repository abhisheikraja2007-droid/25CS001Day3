package com.agri.service;

import com.agri.model.TelemetryLog;
import com.agri.repository.TelemetryLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TelemetryService {

    @Autowired
    private TelemetryLogRepository telemetryLogRepository;

    public TelemetryLog recordTelemetry(TelemetryLog log) {
        log.setTimestamp(LocalDateTime.now());
        TelemetryLog savedLog = telemetryLogRepository.save(log);

        evaluateAlertRules(savedLog);
        
        return savedLog;
    }

    private void evaluateAlertRules(TelemetryLog log) {
        // Business Rule: Soil moisture < 20% triggers an alert
        if (log.getSoilMoisture() != null && log.getSoilMoisture() < 20.0) {
            // Trigger automated pump dispatch or alert
            System.out.println("ALERT: Soil moisture is critical (" + log.getSoilMoisture() + "%) for Farmer ID: " + 
                (log.getFarmer() != null ? log.getFarmer().getId() : "Unknown"));
            
            // In a full implementation, this would trigger a SalesOrder creation for a water dispatch service.
            // createIrrigationDispatchOrder(log.getFarmer());
        }
    }
}
