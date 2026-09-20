import React, { useState } from 'react';

interface LedgerRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LedgerRulesModal: React.FC<LedgerRulesModalProps> = ({ isOpen, onClose }) => {
  const [rules, setRules] = useState([
    {
      id: 'R-04',
      name: 'Soil Moisture Deficit < 20% Automated Run',
      type: 'IoT Telemetry Rule',
      enabled: true,
      description:
        'When node readings dip below 20.0% volumetric soil moisture for > 15 mins, arm pivot pump and auto-generate draft Sales Order with metered volumetric pricing ($1.51/m³).',
    },
    {
      id: 'R-02',
      name: 'Ultrasonic Drip Line Diagnostic Call-off',
      type: 'Field Maintenance Rule',
      enabled: true,
      description:
        'When pressure differential drops exceed 1.2 bar between manifold inlet and terminal drip, dispatch tech diagnostic order.',
    },
    {
      id: 'GAAP-401',
      name: 'Double-Entry Balanced Checksum Enforcement',
      type: 'Accounting Integrity',
      enabled: true,
      description:
        'Reject general ledger commits unless sum(Debit) === sum(Credit) with zero floating point drift.',
    },
    {
      id: 'FIN-03',
      name: 'Net 15 Vendor Due Alert Trigger (T-3 Days)',
      type: 'Payables Control',
      enabled: true,
      description:
        'Flag pending fertilizer and utility vendor bills 72 hours prior to due date with highlighted urgency status.',
    },
  ]);

  if (!isOpen) return null;

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div
      id="ledger-rules-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-[#eaedff]">
        <div className="flex items-center justify-between p-4 bg-[#f2f3ff] border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-lg">tune</span>
            <div>
              <h3 className="font-semibold text-[15px] text-[#012d1d]">
                AgroPulse ERP Ledger &amp; Telemetry Rules
              </h3>
              <p className="text-[11px] text-[#717973] font-mono">
                Automated triggering, volumetric billing &amp; GAAP compliance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#717973] hover:text-[#131b2e] p-1 rounded-full hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="p-3 rounded-lg border border-[#eaedff] bg-[#faf8ff] hover:bg-white transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-[#012d1d] bg-[#eaedff] px-2 py-0.5 rounded">
                    #{rule.id}
                  </span>
                  <span className="text-[13px] font-semibold text-[#131b2e]">
                    {rule.name}
                  </span>
                </div>
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                    rule.enabled ? 'bg-[#116c4a]' : 'bg-[#c1c8c2]'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      rule.enabled ? 'translate-x-4.5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="text-[10px] font-mono text-[#717973] uppercase">
                {rule.type}
              </div>
              <p className="text-[12px] text-[#414844] leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#f2f3ff] border-t border-[#eaedff] flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#116c4a] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a] animate-pulse"></span>
            Rules synced with edge telemetry gateway
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[12px] font-semibold bg-[#012d1d] text-white hover:bg-[#1b4332] rounded-lg transition-colors"
          >
            Apply &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
