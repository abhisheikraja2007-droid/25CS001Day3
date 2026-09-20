import React from 'react';
import { PurchaseOrder } from '../types';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: PurchaseOrder | null;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div
      id="voucher-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-[#eaedff]">
        <div className="flex items-center justify-between p-4 bg-[#f2f3ff] border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-lg">receipt</span>
            <div>
              <h3 className="font-semibold text-[15px] text-[#012d1d]">
                Payment Voucher Record
              </h3>
              <p className="text-[11px] text-[#717973] font-mono">
                Disbursement authorization #{order.poNumber}
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

        <div className="p-4 space-y-3 font-mono text-[12px]">
          <div className="bg-[#faf8ff] p-3 rounded-lg border border-[#eaedff] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#717973]">VOUCHER NO:</span>
              <span className="font-bold text-[#012d1d]">VCH-9941</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#717973]">BENEFICIARY:</span>
              <span className="font-semibold text-[#131b2e]">{order.vendorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#717973]">DISBURSEMENT SUM:</span>
              <span className="font-bold text-[#116c4a] text-[15px]">
                ${order.totalCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#717973]">INSTRUMENT REF:</span>
              <span className="text-[#012d1d]">{order.paymentTerms || 'Check #CHQ-9901'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#717973]">LEDGER ENTRY:</span>
              <span className="text-[#012d1d]">JRN-8839 (Reconciled)</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#116c4a] pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>
              Certified by Chief Agronomy Officer
            </span>
            <span>GAAP Compliant</span>
          </div>
        </div>

        <div className="p-3 bg-[#f2f3ff] border-t border-[#eaedff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[12px] font-semibold bg-[#012d1d] text-white hover:bg-[#1b4332] rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
