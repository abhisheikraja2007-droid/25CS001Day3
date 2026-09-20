package com.agri.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class SectorMoisture {

    @Id
    private String sectorId;
    private String sectorName;
    private String cropType;
    private Double moisturePercent;
    private Double thresholdPercent;
    private String pumpStatus;
    private String pivotId;
    private Integer lastFlowM3;
    private String lastReadingTime;

    // Getters and Setters
    public String getSectorId() { return sectorId; }
    public void setSectorId(String sectorId) { this.sectorId = sectorId; }

    public String getSectorName() { return sectorName; }
    public void setSectorName(String sectorName) { this.sectorName = sectorName; }

    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }

    public Double getMoisturePercent() { return moisturePercent; }
    public void setMoisturePercent(Double moisturePercent) { this.moisturePercent = moisturePercent; }

    public Double getThresholdPercent() { return thresholdPercent; }
    public void setThresholdPercent(Double thresholdPercent) { this.thresholdPercent = thresholdPercent; }

    public String getPumpStatus() { return pumpStatus; }
    public void setPumpStatus(String pumpStatus) { this.pumpStatus = pumpStatus; }

    public String getPivotId() { return pivotId; }
    public void setPivotId(String pivotId) { this.pivotId = pivotId; }

    public Integer getLastFlowM3() { return lastFlowM3; }
    public void setLastFlowM3(Integer lastFlowM3) { this.lastFlowM3 = lastFlowM3; }

    public String getLastReadingTime() { return lastReadingTime; }
    public void setLastReadingTime(String lastReadingTime) { this.lastReadingTime = lastReadingTime; }
}
