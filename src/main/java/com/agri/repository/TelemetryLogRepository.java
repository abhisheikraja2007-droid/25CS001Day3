package com.agri.repository;

import com.agri.model.TelemetryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TelemetryLogRepository extends JpaRepository<TelemetryLog, Long> {
    List<TelemetryLog> findByFarmerId(Long farmerId);
}
