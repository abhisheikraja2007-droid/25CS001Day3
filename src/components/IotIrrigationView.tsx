import React, { useState } from 'react';
import { SectorMoisture } from '../types';

interface IotIrrigationViewProps {
  sectors: SectorMoisture[];
  onTriggerDeficitAlert: (sector: SectorMoisture) => void;
  onNavigateTransactions: () => void;
}

export const IotIrrigationView: React.FC<IotIrrigationViewProps> = ({
  sectors,
  onTriggerDeficitAlert,
  onNavigateTransactions,
}) => {
  const [activeSector, setActiveSector] = useState<SectorMoisture>(sectors[0]);
  const [pivotArmed, setPivotArmed] = useState(true);
  const [pumpRunning, setPumpRunning] = useState(false);

  return (
    <div className="p-4 lg:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#eaedff] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#116c4a] font-bold">
              Precision Hydrology &amp; Telemetry
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a] animate-pulse"></span>
            <span className="text-[10px] font-mono text-[#717973]">Mesh Gateway #GW-01 Active</span>
          </div>
          <h1 className="text-[24px] font-bold text-[#012d1d] tracking-tight">
            IoT Sensor Mesh &amp; Automated Pivot Telemetry
          </h1>
          <p className="text-[12px] text-[#414844]">
            Continuous real-time soil moisture monitoring with automated double-entry invoice triggers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTriggerDeficitAlert(activeSector)}
            className="h-8 px-3 bg-[#ffdcc3] hover:bg-[#ffcaa3] text-[#2f1500] text-[11px] font-mono font-semibold rounded-lg border border-[#ffb77d] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#6e3900]">flash_on</span>
            <span>Simulate Sector 4B Deficit &lt; 20%</span>
          </button>
          <button
            onClick={onNavigateTransactions}
            className="h-8 px-3 bg-[#012d1d] text-white text-[12px] font-semibold rounded-lg hover:bg-[#1b4332] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">receipt_long</span>
            <span>View Ledger Invoices</span>
          </button>
        </div>
      </div>

      {/* Grid: Field Sectors & Live Pivot Control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Sectors Matrix */}
        <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-[#eaedff] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
            <h2 className="text-[14px] font-semibold text-[#012d1d]">
              Zoned Soil Moisture Profiles ({sectors.length} Monitored Sectors)
            </h2>
            <span className="text-[11px] font-mono text-[#717973]">Threshold: 20.0% SM</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sectors.map((sec) => {
              const isDeficit = sec.moisturePercent < sec.thresholdPercent;
              const isSelected = activeSector.sectorId === sec.sectorId;

              return (
                <div
                  key={sec.sectorId}
                  onClick={() => setActiveSector(sec)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#116c4a] bg-[#eaedff]/30 ring-1 ring-[#116c4a]'
                      : 'border-[#eaedff] bg-[#faf8ff] hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-bold text-[#012d1d]">
                          {sec.sectorId}
                        </span>
                        {isDeficit && (
                          <span className="bg-[#ffdad6] text-[#93000a] text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                            Deficit &lt; 20%
                          </span>
                        )}
                      </div>
                      <h3 className="text-[13px] font-semibold text-[#131b2e] mt-0.5">
                        {sec.sectorName}
                      </h3>
                      <span className="text-[11px] text-[#717973]">{sec.cropType}</span>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-[20px] font-mono font-bold ${
                          isDeficit ? 'text-[#ba1a1a]' : 'text-[#116c4a]'
                        }`}
                      >
                        {sec.moisturePercent}%
                      </div>
                      <span className="text-[10px] font-mono text-[#717973]">
                        {sec.lastReadingTime}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="w-full h-2 bg-[#e2e7ff] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDeficit ? 'bg-[#ba1a1a]' : 'bg-[#116c4a]'
                        }`}
                        style={{ width: `${Math.min(100, sec.moisturePercent * 2.5)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-[#717973] mt-1">
                      <span>Crit: 20%</span>
                      <span>Assigned: {sec.pivotId}</span>
                      <span>Optimum: 35%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Depth Chart Simulator */}
          <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#eaedff] mt-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#012d1d] font-semibold mb-2">
              <span>Sensor Depth Stratification ({activeSector.sectorId})</span>
              <span className="text-[#116c4a]">All 3 Probes Reporting</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
              <div className="bg-white p-2 rounded border border-[#eaedff]">
                <span className="text-[#717973] text-[10px] block">10cm Topsoil</span>
                <span className="font-bold text-[#ba1a1a] text-[14px]">
                  {activeSector.moisturePercent}%
                </span>
                <span className="text-[9px] text-[#717973] block mt-0.5">Rapid Evap</span>
              </div>
              <div className="bg-white p-2 rounded border border-[#eaedff]">
                <span className="text-[#717973] text-[10px] block">30cm Root Zone</span>
                <span className="font-bold text-[#116c4a] text-[14px]">
                  {(activeSector.moisturePercent + 3.2).toFixed(1)}%
                </span>
                <span className="text-[9px] text-[#116c4a] block mt-0.5">Active Uptake</span>
              </div>
              <div className="bg-white p-2 rounded border border-[#eaedff]">
                <span className="text-[#717973] text-[10px] block">60cm Subsoil</span>
                <span className="font-bold text-[#012d1d] text-[14px]">
                  {(activeSector.moisturePercent + 8.5).toFixed(1)}%
                </span>
                <span className="text-[9px] text-[#012d1d] block mt-0.5">Capillary Base</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Pivot Controller & Live Ingestion */}
        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-[#eaedff] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#116c4a] animate-ping"></span>
                <h2 className="text-[14px] font-semibold text-[#012d1d]">
                  Center Pivot 03 Telemetry
                </h2>
              </div>
              <span className="text-[10px] font-mono bg-[#a1f4c8] text-[#1b724f] px-2 py-0.5 rounded-full font-bold">
                Armed (Auto-Trigger)
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="bg-[#f2f3ff] p-3 rounded-lg space-y-2 border border-[#eaedff]">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-[#717973]">Operational State:</span>
                  <span className="font-semibold text-[#012d1d] font-mono">
                    {pumpRunning ? 'RUNNING (DISCHARGE ACTIVE)' : 'ARMED / STANDBY'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-[#717973]">Line Pressure:</span>
                  <span className="font-semibold text-[#012d1d] font-mono">
                    {pumpRunning ? '3.82 bar' : '0.40 bar'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-[#717973]">Discharge Rate:</span>
                  <span className="font-semibold text-[#116c4a] font-mono">
                    {pumpRunning ? '185 m³/hr' : '0 m³/hr'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-[#717973]">Contract Volumetric Rate:</span>
                  <span className="font-semibold text-[#012d1d] font-mono">$1.51 / m³</span>
                </div>
              </div>

              {/* Toggle Controls */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between p-2.5 bg-[#faf8ff] rounded-lg border border-[#eaedff]">
                  <div>
                    <span className="text-[12px] font-semibold text-[#131b2e] block">
                      Auto-Pump Deficit Arming
                    </span>
                    <span className="text-[10px] text-[#717973]">
                      Auto-starts pump when soil moisture &lt; 20%
                    </span>
                  </div>
                  <button
                    onClick={() => setPivotArmed(!pivotArmed)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                      pivotArmed ? 'bg-[#116c4a]' : 'bg-[#c1c8c2]'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        pivotArmed ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#faf8ff] rounded-lg border border-[#eaedff]">
                  <div>
                    <span className="text-[12px] font-semibold text-[#131b2e] block">
                      Manual Pump Override
                    </span>
                    <span className="text-[10px] text-[#717973]">
                      Force start/stop high-pressure valve
                    </span>
                  </div>
                  <button
                    onClick={() => setPumpRunning(!pumpRunning)}
                    className={`px-3 py-1 text-[11px] font-mono font-semibold rounded ${
                      pumpRunning
                        ? 'bg-[#ba1a1a] text-white hover:bg-[#93000a]'
                        : 'bg-[#012d1d] text-white hover:bg-[#1b4332]'
                    } transition-colors cursor-pointer`}
                  >
                    {pumpRunning ? 'Emergency Stop' : 'Start Pump'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#e2e7ff]/40 rounded-lg text-[11px] text-[#414844] space-y-1 font-mono border border-[#dae2fd]">
            <span className="font-bold text-[#012d1d] block">IoT Rule R-04 Status:</span>
            <p>
              Telemetry rule R-04 is actively bound to Sector 4B. As soon as reading is below 20.0%,
              an automated billing dispatch order is queued into Transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
