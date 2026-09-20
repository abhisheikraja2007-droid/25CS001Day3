import React, { useState } from 'react';
import { SalesOrder } from '../types';

interface DoubleEntryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder?: SalesOrder | null;
  onPostSuccess: (journalId: string, orderId?: string) => void;
}

export const DoubleEntryDrawer: React.FC<DoubleEntryDrawerProps> = ({
  isOpen,
  onClose,
  activeOrder,
  onPostSuccess,
}) => {
  const [journal, setJournal] = useState('bank');
  const [paymentDate, setPaymentDate] = useState('2024-10-25');
  const [referenceUtr, setReferenceUtr] = useState('UTR-8919240182');
  const [memo, setMemo] = useState(
    'Automated pivot pump discharge recharge; verified via NS-04B sensor'
  );
  const [postingState, setPostingState] = useState<'idle' | 'posting' | 'success'>('idle');

  if (!isOpen) return null;

  const docNumber = activeOrder?.invoiceNumber || 'INV-1092';
  const customer = activeOrder?.customerName || 'Ramesh Patel';
  const amount = activeOrder?.amount || 680.0;
  const ndvi = activeOrder?.ndviScore || 0.74;

  const handlePost = () => {
    if (postingState !== 'idle') return;
    setPostingState('posting');

    setTimeout(() => {
      setPostingState('success');
      const generatedJournal = 'JRN-' + Math.floor(8840 + Math.random() * 50);
      onPostSuccess(generatedJournal, activeOrder?.id);

      setTimeout(() => {
        setPostingState('idle');
      }, 2500);
    }, 700);
  };

  return (
    <div
      id="ledger-drawer"
      className="h-full bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between relative border border-[#eaedff] transition-all duration-300 ring-1 ring-[#116c4a]/15"
    >
      {/* Drawer Top Header */}
      <div className="flex items-center justify-between pb-3 mb-3 bg-[#f2f3ff] -mx-4 -mt-4 px-4 pt-3.5 rounded-t-xl border-b border-[#eaedff]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#116c4a] animate-pulse"></span>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#116c4a] font-bold block leading-tight">
              Double-Entry Terminal
            </span>
            <h3 className="text-[15px] font-semibold text-[#012d1d] leading-snug">
              Payment & Ledger Posting
            </h3>
          </div>
        </div>
        <button
          id="close-drawer-btn"
          onClick={onClose}
          className="text-[#717973] hover:text-[#131b2e] p-1 rounded-full hover:bg-[#dae2fd]/60 transition-colors"
          title="Close posting terminal"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>

      <div className="space-y-3.5 flex-1 overflow-y-auto pr-0.5">
        {/* Active Context Banner */}
        <div className="bg-[#eaedff] p-3 rounded-lg flex items-center justify-between border border-[#dae2fd]/60">
          <div>
            <span className="text-[10px] font-mono text-[#414844] uppercase tracking-wider block">
              Target Document
            </span>
            <div className="text-[16px] font-bold text-[#012d1d] font-mono leading-tight">
              {docNumber}
            </div>
            <span className="text-[12px] text-[#131b2e] font-medium block mt-0.5">
              Customer: {customer}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-[#414844] uppercase tracking-wider block">
              Net Total
            </span>
            <div className="text-[18px] text-[#012d1d] font-mono font-bold leading-tight">
              ${amount.toFixed(2)}
            </div>
            <span className="bg-[#a1f4c8] text-[#1b724f] text-[10px] font-mono px-2 py-0.5 rounded font-semibold inline-block mt-1">
              Verified
            </span>
          </div>
        </div>

        {/* Form Fields for Payment */}
        <div className="space-y-2.5">
          <div>
            <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
              Posting Journal
            </label>
            <div className="relative">
              <select
                id="posting-journal-select"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="w-full h-8 bg-[#f2f3ff] text-[#131b2e] text-[12px] px-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#116c4a] border border-[#eaedff] appearance-none cursor-pointer pr-7"
              >
                <option value="bank">
                  Bank Journal (State Agricultural Bank - Acc ****4910)
                </option>
                <option value="cash">Operating Cash Vault (On-Farm Safe #01)</option>
                <option value="hedging">
                  Agri-Hedging Escrow Reserve (Commodities Desk)
                </option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2 text-sm text-[#717973] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                Payment Date
              </label>
              <input
                id="payment-date-input"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full h-8 bg-[#f2f3ff] text-[#131b2e] text-[12px] px-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#116c4a] border border-[#eaedff]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                Reference / UTR
              </label>
              <input
                id="payment-utr-input"
                type="text"
                value={referenceUtr}
                onChange={(e) => setReferenceUtr(e.target.value)}
                className="w-full h-8 bg-[#f2f3ff] text-[#131b2e] text-[11px] px-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#116c4a] border border-[#eaedff] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
              Internal Audit Memo
            </label>
            <input
              id="payment-memo-input"
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full h-8 bg-[#f2f3ff] text-[#131b2e] text-[12px] px-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#116c4a] border border-[#eaedff]"
            />
          </div>
        </div>

        {/* Live Automatic Double-Entry Ledger Preview */}
        <div className="bg-[#f2f3ff] p-2.5 rounded-xl space-y-1.5 border border-[#eaedff]">
          <div className="flex items-center justify-between pb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#012d1d] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#116c4a]">
                account_tree
              </span>
              Double-Entry Ledger Simulation
            </span>
            <span className="text-[10px] font-mono text-[#116c4a] bg-[#a1f4c8] px-1.5 py-0.5 rounded font-semibold">
              Balanced √
            </span>
          </div>

          {/* Ledger Table */}
          <div className="bg-white rounded-lg p-2 text-xs space-y-1.5 font-mono border border-[#eaedff]">
            <div className="flex justify-between text-[#717973] text-[10px] uppercase border-b border-[#eaedff] pb-1 font-semibold">
              <span>Account & Classification</span>
              <div className="flex gap-4">
                <span className="w-16 text-right">Debit</span>
                <span className="w-16 text-right">Credit</span>
              </div>
            </div>

            {/* Entry 1: Debit */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1.5 truncate max-w-[150px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a] shrink-0"></span>
                <div className="flex flex-col truncate">
                  <span className="font-bold text-[#012d1d] truncate text-[11px]">
                    1010 - State Agri Bank
                  </span>
                  <span className="text-[9px] text-[#717973]">Asset (Current)</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-16 text-right font-bold text-[#116c4a] text-[11px]">
                  ${amount.toFixed(2)}
                </span>
                <span className="w-16 text-right text-[#717973] text-[11px]">-</span>
              </div>
            </div>

            {/* Entry 2: Credit */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1.5 truncate max-w-[150px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#717973] shrink-0"></span>
                <div className="flex flex-col truncate">
                  <span className="font-bold text-[#131b2e] truncate text-[11px]">
                    1200 - Accounts Receivable
                  </span>
                  <span className="text-[9px] text-[#717973]">Farmer Patel Ledger</span>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-16 text-right text-[#717973] text-[11px]">-</span>
                <span className="w-16 text-right font-bold text-[#012d1d] text-[11px]">
                  ${amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#414844] pt-0.5">
            <span>Fiscal Compliance Check:</span>
            <span className="text-[#116c4a] font-semibold">Passed GAAP Standard 401</span>
          </div>
        </div>

        {/* Micro Photo / Documentation Evidence Card */}
        <div className="flex items-center gap-2.5 bg-[#f2f3ff] p-2 rounded-lg border border-[#eaedff]">
          <img
            className="w-12 h-12 object-cover rounded-md shadow-sm shrink-0 border border-white"
            alt="Aerial satellite view of agricultural irrigation pivot circle with precision soil moisture zoning"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiWilS7O5saA811DKvdCTBfqWmTM_680mEINIPXEt6NOtyvPR5n5BzAVINLN12FHpLgv1IqHsYQPSvz4Ezh8KUyxlRywoFgCG8KdDYvg8v6jPFYphktBaPkb0gGBLGccTZxM06VH_aLCVHqDYoyeMM8XLAVASoAXULH91Z-y1btYmfzbC-vxkBgEZOR7meHk4vt9WLhwcvP0xe4qOxFo6uFvvclazEs25Xj1cvMrWnK-1oZm03zOFB9g"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-mono text-[#012d1d] font-bold truncate">
              Telemetric Field Snapshot Attached
            </span>
            <span className="text-[12px] text-[#414844] truncate">
              NDVI Spectrum Index: {ndvi} (Sector 4B)
            </span>
            <span className="text-[10px] font-mono text-[#116c4a] flex items-center gap-1">
              <span className="material-symbols-outlined text-[10px]">verified</span>
              Verified telemetry receipt
            </span>
          </div>
        </div>
      </div>

      {/* Confirm and Post Button Strip */}
      <div className="pt-3 mt-3 border-t border-[#eaedff] flex flex-col gap-2">
        <button
          id="btn-confirm-post-ledger"
          onClick={handlePost}
          disabled={postingState !== 'idle'}
          className={`w-full h-9 font-semibold text-[13px] rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm ${
            postingState === 'posting'
              ? 'bg-[#116c4a] text-white cursor-wait'
              : postingState === 'success'
              ? 'bg-[#1b4332] text-[#86af99]'
              : 'bg-[#012d1d] text-white hover:bg-[#1b4332] active:scale-[0.99]'
          }`}
        >
          {postingState === 'posting' && (
            <>
              <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
              <span>Posting to Ledger...</span>
            </>
          )}
          {postingState === 'success' && (
            <>
              <span className="material-symbols-outlined text-sm text-[#a1f4c8]">
                check_circle
              </span>
              <span>Entry Posted (JRN-8841)</span>
            </>
          )}
          {postingState === 'idle' && (
            <>
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Confirm & Post to General Ledger</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono text-[#717973]">
            Instant journal reconciliation
          </span>
          <span className="text-[10px] font-mono text-[#116c4a] flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a] animate-pulse"></span>
            Auto-sync enabled
          </span>
        </div>
      </div>
    </div>
  );
};
