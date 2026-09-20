import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="settings-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#eaedff]">
        <div className="flex items-center justify-between p-4 bg-[#f2f3ff] border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-lg">tune</span>
            <h3 className="font-semibold text-[15px] text-[#012d1d]">
              AgroPulse ERP System Configuration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#717973] hover:text-[#131b2e] p-1 rounded-full hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 text-[12px]">
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-[#717973] uppercase font-semibold">
              Telemetry Ingestion Gateway
            </label>
            <input
              type="text"
              readOnly
              value="wss://telemetry.agropulse.internal:8443/v2/stream"
              className="w-full h-8 bg-[#f2f3ff] px-2.5 rounded-lg border border-[#eaedff] font-mono text-[#012d1d]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-[#717973] uppercase font-semibold">
              Volumetric Water Tariff Base
            </label>
            <input
              type="text"
              readOnly
              value="$1.51 / m³ (Cycle 08 Regulated Concession Rate)"
              className="w-full h-8 bg-[#f2f3ff] px-2.5 rounded-lg border border-[#eaedff] font-mono text-[#012d1d]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-[#717973] uppercase font-semibold">
              Double-Entry Auto Posting Threshold
            </label>
            <input
              type="text"
              readOnly
              value="Auto-post transactions under $5,000.00 USD with verified IoT telemetry"
              className="w-full h-8 bg-[#f2f3ff] px-2.5 rounded-lg border border-[#eaedff] font-mono text-[#012d1d]"
            />
          </div>
        </div>

        <div className="p-3 bg-[#f2f3ff] border-t border-[#eaedff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[12px] font-semibold bg-[#012d1d] text-white hover:bg-[#1b4332] rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const DocsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="docs-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#eaedff]">
        <div className="flex items-center justify-between p-4 bg-[#f2f3ff] border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-lg">menu_book</span>
            <h3 className="font-semibold text-[15px] text-[#012d1d]">
              AgroPulse Architecture &amp; Telemetry Docs
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#717973] hover:text-[#131b2e] p-1 rounded-full hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 text-[12px] text-[#414844] max-h-80 overflow-y-auto">
          <div className="space-y-1">
            <h4 className="font-bold text-[#012d1d] text-[13px]">
              1. IoT Moisture Telemetry to ERP Pipeline
            </h4>
            <p>
              Sub-surface multi-depth probes transmit capacitance readings every 30 seconds to the
              farm edge mesh gateway. When moisture in any sector drops below 20.0%, Rule R-04
              triggers the automated pivot pump, measures flow volume (m³), and generates a draft
              sales order in real-time.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[#012d1d] text-[13px]">
              2. Double-Entry General Ledger Posting
            </h4>
            <p>
              Every completed irrigation discharge is mapped against GAAP Standard 401: Debit 1010
              (State Agricultural Bank or Cash) and Credit 1200 (Accounts Receivable / Farmer
              Contract).
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#f2f3ff] border-t border-[#eaedff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[12px] font-semibold bg-[#012d1d] text-white hover:bg-[#1b4332] rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
