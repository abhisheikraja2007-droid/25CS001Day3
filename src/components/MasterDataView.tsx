import React, { useState } from 'react';

export const MasterDataView: React.FC = () => {
  const [subTab, setSubTab] = useState<'farmers' | 'sensors' | 'contracts'>('farmers');

  const farmers = [
    {
      id: 'CUST-001',
      name: 'Ramesh Patel',
      plot: 'Plot 12-West (North Basin)',
      hectares: 40,
      crop: 'Wheat (Durum)',
      pivot: 'Pivot 03',
      creditRating: 'AAA',
      ledgerBalance: '$680.00 Outstanding',
    },
    {
      id: 'CUST-002',
      name: 'Sunita Devi',
      plot: 'Orchard Block 8',
      hectares: 15,
      crop: 'Pomegranates & Citrus',
      pivot: 'Drip System 02',
      creditRating: 'AA+',
      ledgerBalance: '$0.00 Current',
    },
    {
      id: 'CUST-003',
      name: 'Vikram Singh',
      plot: 'Pinnacle Basins',
      hectares: 85,
      crop: 'Basmati Rice & Cotton',
      pivot: 'Pivot 01 & 04',
      creditRating: 'AAA',
      ledgerBalance: '$0.00 Settled Wire',
    },
    {
      id: 'CUST-004',
      name: 'Harpreet Gill',
      plot: 'Canal Ridge Terraces',
      hectares: 55,
      crop: 'Mustard & Chickpea',
      pivot: 'Drip Line High Zone',
      creditRating: 'A+',
      ledgerBalance: '$512.00 Invoiced',
    },
  ];

  const sensors = [
    {
      id: 'NS-04B-91',
      sector: 'Sector 4B',
      depth: '10cm, 30cm, 60cm',
      battery: '94%',
      status: 'Online',
      lastPing: '30s ago',
      meshHop: 'Gateway direct',
    },
    {
      id: 'NS-02A-14',
      sector: 'Sector 2A',
      depth: '20cm, 50cm',
      battery: '88%',
      status: 'Online',
      lastPing: '1m ago',
      meshHop: 'Hop via NS-02A-12',
    },
    {
      id: 'NS-01C-08',
      sector: 'Sector 1C',
      depth: '10cm, 30cm, 60cm',
      battery: '99%',
      status: 'Online',
      lastPing: '10s ago',
      meshHop: 'Gateway direct',
    },
    {
      id: 'NS-03D-42',
      sector: 'Sector 3D',
      depth: '15cm, 45cm',
      battery: '78%',
      status: 'Online',
      lastPing: '2m ago',
      meshHop: 'Hop via NS-03D-39',
    },
  ];

  const contracts = [
    {
      sku: 'WTR-PREC-01',
      name: 'Precision Irrigation Water Flow',
      unit: 'm³ (Cubic Meter)',
      baseRate: '$1.51 / m³',
      tierNotes: 'Automated telemetry debit, min 100m³ per pivot cycle',
    },
    {
      sku: 'DRIP-INSP-02',
      name: 'Drip Line Ultrasonic Emitter Diagnostic',
      unit: 'Flat Inspection Fee',
      baseRate: '$240.00 / Run',
      tierNotes: 'Certified field tech with acoustic sensor suite',
    },
    {
      sku: 'AGR-NPK-03',
      name: 'NPK Agronomy Advisory & Prescription Map',
      unit: 'Per Zone Mapping',
      baseRate: '$1,150.00 / Assessment',
      tierNotes: 'Spectrophotometric soil assay + variable rate prescription',
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#eaedff] shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#116c4a] font-bold">
            Master Data &amp; Agrarian Governance
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a]"></span>
          <span className="text-[10px] font-mono text-[#717973]">Central ERP Master Ledger</span>
        </div>
        <h1 className="text-[24px] font-bold text-[#012d1d] tracking-tight">
          Farmer Accounts, Sensor Fleet &amp; Contract Catalog
        </h1>
        <p className="text-[12px] text-[#414844]">
          Entity definitions, land plot boundaries, and standardized volumetric service rates
        </p>

        {/* Subtabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setSubTab('farmers')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
              subTab === 'farmers'
                ? 'bg-[#012d1d] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#414844] hover:text-[#131b2e]'
            }`}
          >
            Farmer Entities ({farmers.length})
          </button>
          <button
            onClick={() => setSubTab('sensors')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
              subTab === 'sensors'
                ? 'bg-[#012d1d] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#414844] hover:text-[#131b2e]'
            }`}
          >
            IoT Sensor Fleet (48 Nodes)
          </button>
          <button
            onClick={() => setSubTab('contracts')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
              subTab === 'contracts'
                ? 'bg-[#012d1d] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#414844] hover:text-[#131b2e]'
            }`}
          >
            Service Rate Contracts
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-[#eaedff] shadow-xs overflow-hidden">
        {subTab === 'farmers' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead>
                <tr className="bg-[#f2f3ff] text-[#717973] font-mono text-[10px] uppercase border-b border-[#eaedff]">
                  <th className="py-2.5 px-3.5">Customer ID</th>
                  <th className="py-2.5 px-3.5">Farmer Name</th>
                  <th className="py-2.5 px-3.5">Assigned Land Plot</th>
                  <th className="py-2.5 px-3.5">Hectares</th>
                  <th className="py-2.5 px-3.5">Dominant Crop</th>
                  <th className="py-2.5 px-3.5">Credit Rating</th>
                  <th className="py-2.5 px-3.5 text-right">Ledger Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f3ff]">
                {farmers.map((f) => (
                  <tr key={f.id} className="hover:bg-[#f2f3ff]/50 transition-colors">
                    <td className="py-3 px-3.5 font-mono font-bold text-[#012d1d]">{f.id}</td>
                    <td className="py-3 px-3.5 font-semibold text-[#131b2e]">{f.name}</td>
                    <td className="py-3 px-3.5 text-[#414844]">{f.plot}</td>
                    <td className="py-3 px-3.5 font-mono">{f.hectares} Ha</td>
                    <td className="py-3 px-3.5 text-[#131b2e]">{f.crop}</td>
                    <td className="py-3 px-3.5">
                      <span className="bg-[#a1f4c8] text-[#1b724f] text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                        {f.creditRating}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono font-semibold text-[#012d1d]">
                      {f.ledgerBalance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {subTab === 'sensors' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead>
                <tr className="bg-[#f2f3ff] text-[#717973] font-mono text-[10px] uppercase border-b border-[#eaedff]">
                  <th className="py-2.5 px-3.5">Sensor Node MAC</th>
                  <th className="py-2.5 px-3.5">Deployed Sector</th>
                  <th className="py-2.5 px-3.5">Probe Depths</th>
                  <th className="py-2.5 px-3.5">Battery</th>
                  <th className="py-2.5 px-3.5">Status</th>
                  <th className="py-2.5 px-3.5">Last Transmission</th>
                  <th className="py-2.5 px-3.5 text-right">Mesh Topology</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f3ff]">
                {sensors.map((s) => (
                  <tr key={s.id} className="hover:bg-[#f2f3ff]/50 transition-colors">
                    <td className="py-3 px-3.5 font-mono font-bold text-[#012d1d]">#{s.id}</td>
                    <td className="py-3 px-3.5 font-semibold text-[#131b2e]">{s.sector}</td>
                    <td className="py-3 px-3.5 text-[#414844] font-mono">{s.depth}</td>
                    <td className="py-3 px-3.5 font-mono text-[#116c4a] font-bold">{s.battery}</td>
                    <td className="py-3 px-3.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#116c4a] font-semibold bg-[#a1f4c8]/50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a]"></span>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-[#717973] font-mono">{s.lastPing}</td>
                    <td className="py-3 px-3.5 text-right font-mono text-[11px] text-[#012d1d]">
                      {s.meshHop}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {subTab === 'contracts' && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {contracts.map((c) => (
              <div
                key={c.sku}
                className="p-4 rounded-xl border border-[#eaedff] bg-[#faf8ff] space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#717973] uppercase font-bold">
                    SKU: {c.sku}
                  </span>
                  <h3 className="text-[14px] font-semibold text-[#012d1d] mt-1">{c.name}</h3>
                  <div className="text-[20px] font-mono font-bold text-[#116c4a] mt-2">
                    {c.baseRate}
                  </div>
                  <span className="text-[11px] text-[#717973]">Billing Unit: {c.unit}</span>
                </div>
                <p className="text-[11px] text-[#414844] bg-white p-2 rounded border border-[#eaedff]">
                  {c.tierNotes}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
