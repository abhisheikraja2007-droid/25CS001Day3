import React, { useState } from 'react';
import { SalesOrder, PurchaseOrder } from '../types';

interface ExportLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  salesOrders: SalesOrder[];
  purchaseOrders: PurchaseOrder[];
}

export const ExportLedgerModal: React.FC<ExportLedgerModalProps> = ({
  isOpen,
  onClose,
  salesOrders,
  purchaseOrders,
}) => {
  const [format, setFormat] = useState<'csv' | 'json' | 'excel'>('csv');
  const [period, setPeriod] = useState('Fiscal Q3 / Cycle 08');
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      if (format === 'json') {
        const dataStr =
          'data:text/json;charset=utf-8,' +
          encodeURIComponent(
            JSON.stringify(
              {
                system: 'AgroPulse ERP',
                fiscalPeriod: period,
                exportedAt: new Date().toISOString(),
                salesOrders,
                purchaseOrders,
              },
              null,
              2
            )
          );
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `agropulse_ledger_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      } else {
        // CSV export
        const headers = ['Type', 'Identifier', 'Date', 'Party', 'Description', 'Amount_USD', 'Status'];
        const soRows = salesOrders.map((s) => [
          'Sales Order',
          s.orderNumber,
          s.timestamp,
          `"${s.customerName}"`,
          `"${s.serviceSku}"`,
          s.amount,
          s.status,
        ]);
        const poRows = purchaseOrders.map((p) => [
          'Purchase Order',
          p.poNumber,
          p.createdDate,
          `"${p.vendorName}"`,
          `"${p.products}"`,
          p.totalCost,
          p.status,
        ]);
        const csvContent =
          'data:text/csv;charset=utf-8,' +
          [headers.join(','), ...soRows.map((e) => e.join(',')), ...poRows.map((e) => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `agropulse_ledger_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      setDownloading(false);
      setDownloadDone(true);
      setTimeout(() => {
        setDownloadDone(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div
      id="export-ledger-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-[#eaedff]">
        <div className="flex items-center justify-between p-4 bg-[#f2f3ff] border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-lg">download</span>
            <div>
              <h3 className="font-semibold text-[15px] text-[#012d1d]">
                Export General &amp; Farm Ledgers
              </h3>
              <p className="text-[11px] text-[#717973] font-mono">
                GAAP Standard 401 compliant export
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

        <div className="p-4 space-y-3.5">
          <div>
            <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
              Fiscal Period
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a]"
            >
              <option value="Fiscal Q3 / Cycle 08">Fiscal Q3 / Cycle 08 (Current)</option>
              <option value="Fiscal Q3 / All Cycles">Fiscal Q3 / All Cycles</option>
              <option value="Year-to-Date 2024">Year-to-Date 2024</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`py-2 px-3 rounded-lg border text-center text-[12px] font-medium transition-all ${
                  format === 'csv'
                    ? 'border-[#116c4a] bg-[#eaedff] text-[#012d1d] font-semibold ring-1 ring-[#116c4a]'
                    : 'border-[#eaedff] text-[#414844] hover:bg-[#f2f3ff]'
                }`}
              >
                CSV Table
              </button>
              <button
                type="button"
                onClick={() => setFormat('excel')}
                className={`py-2 px-3 rounded-lg border text-center text-[12px] font-medium transition-all ${
                  format === 'excel'
                    ? 'border-[#116c4a] bg-[#eaedff] text-[#012d1d] font-semibold ring-1 ring-[#116c4a]'
                    : 'border-[#eaedff] text-[#414844] hover:bg-[#f2f3ff]'
                }`}
              >
                Excel CSV
              </button>
              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`py-2 px-3 rounded-lg border text-center text-[12px] font-medium transition-all ${
                  format === 'json'
                    ? 'border-[#116c4a] bg-[#eaedff] text-[#012d1d] font-semibold ring-1 ring-[#116c4a]'
                    : 'border-[#eaedff] text-[#414844] hover:bg-[#f2f3ff]'
                }`}
              >
                Audit JSON
              </button>
            </div>
          </div>

          <div className="bg-[#f2f3ff] p-2.5 rounded-lg text-[11px] text-[#414844] space-y-1 font-mono">
            <div className="flex justify-between">
              <span>Sales Dispatches:</span>
              <span className="font-semibold text-[#012d1d]">{salesOrders.length} records</span>
            </div>
            <div className="flex justify-between">
              <span>Procurement POs:</span>
              <span className="font-semibold text-[#012d1d]">{purchaseOrders.length} records</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#f2f3ff] border-t border-[#eaedff] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-[12px] text-[#414844] hover:bg-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={downloading}
            className="px-4 py-1.5 text-[12px] font-semibold bg-[#012d1d] text-white hover:bg-[#1b4332] rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
          >
            {downloading ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                <span>Generating...</span>
              </>
            ) : downloadDone ? (
              <>
                <span className="material-symbols-outlined text-sm text-[#a1f4c8]">check</span>
                <span>Exported!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">file_download</span>
                <span>Download File</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
