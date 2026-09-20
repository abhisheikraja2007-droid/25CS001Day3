package com.agri.repository;

import com.agri.model.SectorMoisture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectorMoistureRepository extends JpaRepository<SectorMoisture, String> {
}
