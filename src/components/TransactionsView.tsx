import React, { useState, useMemo } from 'react';
import { SalesOrder, PurchaseOrder } from '../types';
import { DoubleEntryDrawer } from './DoubleEntryDrawer';

interface TransactionsViewProps {
  salesOrders: SalesOrder[];
  purchaseOrders: PurchaseOrder[];
  onOpenLedgerRules: () => void;
  onOpenExport: () => void;
  onOpenNewTransaction: () => void;
  onConvertInvoice: (so: SalesOrder) => void;
  onPostSuccess: (journalId: string, orderId?: string) => void;
  onGenerateBulkInvoices: () => void;
  onReceiveBill: (po: PurchaseOrder) => void;
  onViewVoucher: (po: PurchaseOrder) => void;
}

type WorkflowTab = 'all' | 'sales' | 'invoices' | 'purchase' | 'bills';

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  salesOrders,
  purchaseOrders,
  onOpenLedgerRules,
  onOpenExport,
  onOpenNewTransaction,
  onConvertInvoice,
  onPostSuccess,
  onGenerateBulkInvoices,
  onReceiveBill,
  onViewVoucher,
}) => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<WorkflowTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(salesOrders[0] || null);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerPulse, setDrawerPulse] = useState(false);
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  // Trigger drawer focus with visual cue
  const openOrderInDrawer = (order: SalesOrder) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
    setDrawerPulse(true);
    setTimeout(() => setDrawerPulse(false), 900);
  };

  // Filtered Sales Orders
  const filteredSalesOrders = useMemo(() => {
    return salesOrders.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (item.orderNumber || '').toLowerCase().includes(q) ||
        (item.customerName || '').toLowerCase().includes(q) ||
        (item.serviceSku || '').toLowerCase().includes(q) ||
        (item.invoiceNumber || '').toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (activeWorkflowTab === 'sales') return true;
      if (activeWorkflowTab === 'invoices') return item.status !== 'Paid via Bank';
      if (activeWorkflowTab === 'purchase' || activeWorkflowTab === 'bills') return false;

      return true;
    });
  }, [salesOrders, searchQuery, activeWorkflowTab]);

  // Filtered Purchase Orders
  const filteredPurchaseOrders = useMemo(() => {
    return purchaseOrders.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (item.poNumber || '').toLowerCase().includes(q) ||
        (item.vendorName || '').toLowerCase().includes(q) ||
        (item.products || '').toLowerCase().includes(q) ||
        (item.billNumber || '').toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (activeWorkflowTab === 'purchase') return true;
      if (activeWorkflowTab === 'bills') return item.status === 'Bill Received' || item.isUrgent;
      if (activeWorkflowTab === 'sales' || activeWorkflowTab === 'invoices') return false;

      return true;
    });
  }, [purchaseOrders, searchQuery, activeWorkflowTab]);

  // Paginated display for SO table
  const pageSize = 3;
  const paginatedSalesOrders = filteredSalesOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredSalesOrders.length / pageSize) || 1;

  // Flow volume calculation based on timeframe
  const flowData = {
    '24h': { total: '4,120 m³', path: 'M0 32 Q 20 28, 40 30 T 80 18 T 120 22 T 160 8 T 200 14 T 240 4' },
    '7d': { total: '28,940 m³', path: 'M0 24 Q 30 12, 60 20 T 120 10 T 180 26 T 240 8' },
    '30d': { total: '118,500 m³', path: 'M0 20 Q 40 30, 80 15 T 160 25 T 240 12' },
  }[timeframe];

  return (
    <div className="relative w-full overflow-hidden p-4 lg:p-6">
      {/* Subtle ambient decorative depth layer (contained) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c1ecd4]/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-48 left-10 w-80 h-80 bg-[#a1f4c8]/25 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Page Command Strip & Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#116c4a] font-bold">
              Commercial Operations &amp; Ledger Hub
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c1c8c2]"></span>
            <span className="text-[10px] font-mono text-[#717973] font-medium">
              Fiscal Q3 / Cycle 08
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c1c8c2]"></span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#116c4a] bg-[#a1f4c8]/40 px-2 py-0.5 rounded-full border border-[#a1f4c8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a] animate-ping"></span>
              Real-time Telemetry Ingestion Active
            </span>
          </div>
          <h1 className="text-[28px] lg:text-[32px] font-bold text-[#012d1d] tracking-tight leading-tight">
            ERP Transactions &amp; Commercial Processing
          </h1>
        </div>

        {/* Quick Action Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-[#717973] text-base pointer-events-none">
              search
            </span>
            <input
              id="filter-transactions-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter SO, PO, Customer, SKU..."
              className="h-8 pl-8 pr-3 bg-white text-[#131b2e] text-[12px] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#116c4a] border border-[#eaedff] w-56 sm:w-64 transition-all"
            />
          </div>

          <button
            id="btn-ledger-rules"
            onClick={onOpenLedgerRules}
            className="h-8 px-3 bg-white text-[#131b2e] text-[12px] font-medium rounded-lg shadow-sm hover:bg-[#f2f3ff] transition-colors border border-[#eaedff] flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#717973]">tune</span>
            <span>Ledger Rules</span>
          </button>

          <button
            id="btn-export-ledger"
            onClick={onOpenExport}
            className="h-8 px-3 bg-white text-[#131b2e] text-[12px] font-medium rounded-lg shadow-sm hover:bg-[#f2f3ff] transition-colors border border-[#eaedff] flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#717973]">download</span>
            <span>Export Ledger</span>
          </button>

          <button
            id="btn-register-payment"
            onClick={() => {
              setIsDrawerOpen(true);
              setDrawerPulse(true);
              setTimeout(() => setDrawerPulse(false), 900);
            }}
            className="h-8 px-3 bg-[#012d1d] text-white text-[12px] font-semibold rounded-lg shadow-sm hover:bg-[#1b4332] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add_card</span>
            <span>Register Payment</span>
          </button>
        </div>
      </div>

      {/* Workflow Segmentation Tabs */}
      <div className="flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-lg mb-4 overflow-x-auto border border-[#eaedff] shadow-xs">
        <button
          id="tab-all"
          onClick={() => setActiveWorkflowTab('all')}
          className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeWorkflowTab === 'all'
              ? 'bg-white text-[#012d1d] shadow-sm'
              : 'text-[#414844] hover:text-[#131b2e]'
          }`}
        >
          <span>All Transactions</span>
          <span className="bg-[#eaedff] text-[#414844] px-1.5 py-0.2 rounded text-[10px] font-mono">
            54
          </span>
        </button>

        <button
          id="tab-sales"
          onClick={() => setActiveWorkflowTab('sales')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeWorkflowTab === 'sales'
              ? 'bg-white text-[#012d1d] font-semibold shadow-sm'
              : 'text-[#414844] hover:text-[#131b2e]'
          }`}
        >
          <span>Sales Orders (Farmer Services)</span>
          <span className="bg-[#a1f4c8]/60 text-[#1b724f] px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold">
            14
          </span>
        </button>

        <button
          id="tab-invoices"
          onClick={() => setActiveWorkflowTab('invoices')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeWorkflowTab === 'invoices'
              ? 'bg-white text-[#012d1d] font-semibold shadow-sm'
              : 'text-[#414844] hover:text-[#131b2e]'
          }`}
        >
          <span>Customer Invoices</span>
          <span className="bg-[#eaedff] text-[#414844] px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold">
            6 Unbilled
          </span>
        </button>

        <button
          id="tab-purchase"
          onClick={() => setActiveWorkflowTab('purchase')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeWorkflowTab === 'purchase'
              ? 'bg-white text-[#012d1d] font-semibold shadow-sm'
              : 'text-[#414844] hover:text-[#131b2e]'
          }`}
        >
          <span>Purchase Orders (Vendor Supplies)</span>
          <span className="bg-[#eaedff] text-[#414844] px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold">
            18
          </span>
        </button>

        <button
          id="tab-bills"
          onClick={() => setActiveWorkflowTab('bills')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeWorkflowTab === 'bills'
              ? 'bg-white text-[#012d1d] font-semibold shadow-sm'
              : 'text-[#414844] hover:text-[#131b2e]'
          }`}
        >
          <span>Vendor Bills &amp; Payments</span>
          <span className="bg-[#ffdad6]/60 text-[#93000a] px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold">
            3 Critical
          </span>
        </button>
      </div>

      {/* Summary Metrics Dashboard (4-Column Bento) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {/* Metric 1 */}
        <div className="relative bg-white p-3.5 rounded-xl shadow-xs border border-[#eaedff] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#717973] font-semibold">
                Total Open Sales Orders
              </span>
              <span className="text-[24px] text-[#012d1d] font-bold mt-0.5 font-mono tracking-tight">
                $28,450.00
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#a1f4c8]/40 flex items-center justify-center text-[#116c4a]">
              <span className="material-symbols-outlined text-base">water_drop</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 bg-[#f2f3ff]/60 -mx-3.5 -mb-3.5 px-3.5 py-1.5 mt-2 border-t border-[#eaedff]">
            <span className="text-[11px] text-[#414844]">
              14 orders •{' '}
              <strong className="text-[#116c4a] font-semibold">8 auto-triggered</strong> via
              telemetry
            </span>
            <span className="text-[10px] font-mono text-[#116c4a] flex items-center font-bold">
              +18.4%
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="relative bg-white p-3.5 rounded-xl shadow-xs border border-[#eaedff] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#717973] font-semibold">
                Pending Customer Invoices
              </span>
              <span className="text-[24px] text-[#131b2e] font-bold mt-0.5 font-mono tracking-tight">
                $14,200.00
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#ffdcc3] flex items-center justify-center text-[#6e3900]">
              <span className="material-symbols-outlined text-base">receipt_long</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 bg-[#f2f3ff]/60 -mx-3.5 -mb-3.5 px-3.5 py-1.5 mt-2 border-t border-[#eaedff]">
            <span className="text-[11px] text-[#414844] truncate pr-1">
              6 unbilled irrigation runs awaiting meter lock
            </span>
            <span className="text-[10px] font-mono text-[#6e3900] bg-[#ffdcc3] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
              Action req.
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="relative bg-white p-3.5 rounded-xl shadow-xs border border-[#eaedff] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#717973] font-semibold">
                Open Purchase Orders
              </span>
              <span className="text-[24px] text-[#012d1d] font-bold mt-0.5 font-mono tracking-tight">
                $42,180.00
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#012d1d]">
              <span className="material-symbols-outlined text-base">inventory_2</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 bg-[#f2f3ff]/60 -mx-3.5 -mb-3.5 px-3.5 py-1.5 mt-2 border-t border-[#eaedff]">
            <span className="text-[11px] text-[#414844] truncate">
              Agri-supplies &amp; Macro-Fertilizer imports
            </span>
            <span className="text-[10px] font-mono text-[#717973] font-medium whitespace-nowrap">
              9 active POs
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="relative bg-white p-3.5 rounded-xl shadow-xs border border-[#eaedff] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#ba1a1a] font-semibold">
                Vendor Bills Due (7 days)
              </span>
              <span className="text-[24px] text-[#ba1a1a] font-bold mt-0.5 font-mono tracking-tight">
                $18,920.00
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#ffdad6]/50 flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-base">pending_actions</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 bg-[#f2f3ff]/60 -mx-3.5 -mb-3.5 px-3.5 py-1.5 mt-2 border-t border-[#eaedff]">
            <span className="text-[11px] text-[#414844] truncate">
              AgriSupplies Co., Water Utilities
            </span>
            <span className="text-[10px] font-mono text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
              T-3 days
            </span>
          </div>
        </div>
      </div>

      {/* Main Dynamic Workplace: Top Section & Lower Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Left Column: Tabular Grids (Takes full 12 cols if drawer is closed, or 8 cols if open) */}
        <div
          id="table-canvas"
          className={`flex flex-col gap-4 transition-all duration-300 ${
            isDrawerOpen ? 'xl:col-span-8' : 'xl:col-span-12'
          }`}
        >
          {/* Top Section: Automated Irrigation Service Sales & Invoicing Pipeline */}
          {(activeWorkflowTab === 'all' ||
            activeWorkflowTab === 'sales' ||
            activeWorkflowTab === 'invoices') && (
            <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] overflow-hidden">
              <div className="px-4 py-3 bg-[#f2f3ff] flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eaedff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-4 bg-[#116c4a] rounded-full"></div>
                  <div>
                    <h2 className="text-[14px] font-semibold text-[#012d1d] leading-snug">
                      Automated Irrigation Service Sales &amp; Invoicing Pipeline
                    </h2>
                    <p className="text-[11px] text-[#717973]">
                      Real-time IoT threshold dispatches synced with double-entry customer ledgers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#717973] uppercase font-semibold">
                    Bulk Action:
                  </span>
                  <button
                    id="btn-bulk-generate-invoices"
                    onClick={onGenerateBulkInvoices}
                    className="h-7 px-2.5 bg-white text-[#012d1d] text-[11px] font-semibold rounded border border-[#eaedff] shadow-xs hover:bg-[#eaedff] transition-colors cursor-pointer"
                  >
                    Generate 4 Pending Invoices
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-[#717973] text-[10px] font-mono uppercase tracking-wider border-b border-[#eaedff]">
                      <th className="py-2.5 px-3.5">Order ID</th>
                      <th className="py-2.5 px-3.5">Trigger Source &amp; Telemetry</th>
                      <th className="py-2.5 px-3.5">Customer / Farmer</th>
                      <th className="py-2.5 px-3.5">Service / Product SKU</th>
                      <th className="py-2.5 px-3.5 text-right">Amount (USD)</th>
                      <th className="py-2.5 px-3.5 text-center">Status</th>
                      <th className="py-2.5 px-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2f3ff] text-[12px]">
                    {paginatedSalesOrders.map((so) => (
                      <tr
                        key={so.id}
                        onClick={() => openOrderInDrawer(so)}
                        className={`hover:bg-[#f2f3ff]/50 transition-colors group cursor-pointer ${
                          selectedOrder?.id === so.id ? 'bg-[#eaedff]/40' : ''
                        }`}
                      >
                        {/* Order ID */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-mono text-[12px] font-bold text-[#012d1d]">
                            <span className="material-symbols-outlined text-sm text-[#116c4a]">
                              sensors
                            </span>
                            <span>{so.orderNumber}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#717973] block mt-0.5">
                            {so.timestamp}
                          </span>
                        </td>

                        {/* Trigger Source & Telemetry */}
                        <td className="py-3 px-3.5">
                          <div className="flex flex-col">
                            <span
                              className={`text-[10px] font-mono font-semibold flex items-center gap-1 ${
                                so.triggerType === 'telemetry'
                                  ? 'text-[#ba1a1a]'
                                  : so.triggerType === 'advisory'
                                  ? 'text-[#116c4a]'
                                  : 'text-[#131b2e]'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  so.triggerType === 'telemetry'
                                    ? 'bg-[#ba1a1a]'
                                    : so.triggerType === 'advisory'
                                    ? 'bg-[#116c4a]'
                                    : 'bg-[#717973]'
                                }`}
                              ></span>
                              {so.telemetryRule}
                            </span>
                            <span className="text-[11px] text-[#717973] mt-0.5">
                              {so.telemetrySensor}
                            </span>
                          </div>
                        </td>

                        {/* Customer / Farmer */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="font-semibold text-[#131b2e]">{so.customerName}</div>
                          <span className="text-[10px] font-mono text-[#717973]">
                            {so.landDetails}
                          </span>
                        </td>

                        {/* Service / SKU */}
                        <td className="py-3 px-3.5">
                          <div className="text-[#131b2e] font-medium">{so.serviceSku}</div>
                          <span className="text-[10px] text-[#717973]">
                            {so.serviceDescription}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="py-3 px-3.5 text-right whitespace-nowrap">
                          <span className="text-[12px] font-mono font-bold text-[#012d1d]">
                            ${(so.amount || 0).toFixed(2)}
                          </span>
                          <span className="block text-[10px] font-mono text-[#717973]">
                            {so.rateInfo}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3.5 text-center whitespace-nowrap">
                          {so.status === 'Auto-Generated' && (
                            <span className="inline-flex items-center gap-1 bg-[#eaedff] text-[#131b2e] text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f48c24]"></span>
                              Auto-Generated
                            </span>
                          )}
                          {so.status === 'Converted to Invoice' && (
                            <span className="inline-flex items-center gap-1 bg-[#a1f4c8]/50 text-[#1b724f] text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a]"></span>
                              Converted to Invoice #{so.invoiceNumber}
                            </span>
                          )}
                          {so.status === 'Paid via Bank' && (
                            <span className="inline-flex items-center gap-1 bg-[#e2e7ff] text-[#012d1d] text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#012d1d]"></span>
                              Paid via Bank
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3.5 text-right whitespace-nowrap">
                          <div
                            className="flex items-center justify-end gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {so.status === 'Auto-Generated' && (
                              <button
                                onClick={() => onConvertInvoice(so)}
                                className="h-6 px-2 bg-[#1b4332] text-[#86af99] text-[10px] font-mono rounded hover:bg-[#012d1d] transition-colors hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <span>Convert to Invoice</span>
                                <span className="material-symbols-outlined text-xs">
                                  arrow_forward
                                </span>
                              </button>
                            )}

                            {so.status === 'Converted to Invoice' && (
                              <button
                                onClick={() => openOrderInDrawer(so)}
                                className="h-6 px-2 bg-[#116c4a] text-white text-[10px] font-mono rounded hover:bg-[#012d1d] transition-colors font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <span>Register Payment</span>
                              </button>
                            )}

                            {so.status === 'Paid via Bank' && (
                              <button
                                onClick={() => openOrderInDrawer(so)}
                                className="h-6 px-2 bg-[#eaedff] text-[#414844] hover:text-[#012d1d] text-[10px] font-mono rounded transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-xs">
                                  visibility
                                </span>
                                <span>Journal Entry</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table pagination strip */}
              <div className="px-4 py-2 bg-[#f2f3ff]/60 flex items-center justify-between text-[#717973] text-[10px] font-mono border-t border-[#eaedff]">
                <span>
                  Displaying {paginatedSalesOrders.length} of {filteredSalesOrders.length} active farm
                  service dispatches
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="hover:text-[#012d1d] disabled:opacity-40 cursor-pointer"
                  >
                    ← Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`cursor-pointer px-1 ${
                        currentPage === page ? 'text-[#012d1d] font-bold' : 'hover:text-[#012d1d]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="hover:text-[#012d1d] disabled:opacity-40 cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Visual Analytics Ribbon: Real-Time Metering */}
          <div className="bg-white p-3.5 rounded-xl shadow-xs border border-[#eaedff] grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#116c4a] font-bold">
                  Real-time Metering
                </span>
                <div className="flex gap-1">
                  {(['24h', '7d', '30d'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        timeframe === tf
                          ? 'bg-[#116c4a] text-white font-bold'
                          : 'bg-[#f2f3ff] text-[#717973] hover:text-[#131b2e]'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-[15px] font-semibold text-[#012d1d] mt-1 leading-snug">
                Live Automated Pumping Ledger
              </span>
              <p className="text-[11px] text-[#717973] mt-0.5">
                Water and nutrient volume automated debiting against farm contracts
              </p>
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              {/* Inline SVG Chart: Flow Volume */}
              <div className="flex-1 bg-[#f2f3ff] p-2 rounded-lg border border-[#eaedff]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono text-[#717973]">
                    {timeframe} Billed Flow (m³)
                  </span>
                  <span className="text-[10px] font-mono text-[#116c4a] font-bold">
                    {flowData.total}
                  </span>
                </div>
                <svg
                  className="w-full h-10 text-[#116c4a]"
                  fill="none"
                  viewBox="0 0 240 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={flowData.path}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  ></path>
                  <path
                    d={`${flowData.path} L 240 40 L 0 40 Z`}
                    fill="currentColor"
                    fillOpacity="0.12"
                  ></path>
                </svg>
              </div>

              {/* Quick KPI Mini Block */}
              <div className="bg-[#012d1d] p-2.5 rounded-lg text-white min-w-[135px] flex flex-col justify-between h-full shadow-xs">
                <span className="text-[9px] font-mono opacity-80 uppercase tracking-wider">
                  Unposted Margin
                </span>
                <span className="text-[18px] font-bold font-mono text-white leading-tight">
                  34.2%
                </span>
                <span className="text-[10px] font-mono text-[#a1f4c8]">+$3,410.80 accrued</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Procurement & Vendor Bills */}
          {(activeWorkflowTab === 'all' ||
            activeWorkflowTab === 'purchase' ||
            activeWorkflowTab === 'bills') && (
            <div className="bg-white rounded-xl shadow-xs border border-[#eaedff] overflow-hidden">
              <div className="px-4 py-3 bg-[#f2f3ff] flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eaedff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-4 bg-[#5e3000] rounded-full"></div>
                  <div>
                    <h2 className="text-[14px] font-semibold text-[#012d1d] leading-snug">
                      Procurement &amp; Vendor Bills
                    </h2>
                    <p className="text-[11px] text-[#717973]">
                      Input supplies, infrastructure parts, and bulk utility liabilities
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id="btn-create-po"
                    onClick={onOpenNewTransaction}
                    className="h-7 px-2.5 bg-[#012d1d] text-white text-[11px] font-semibold rounded shadow-xs hover:bg-[#1b4332] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">add</span>
                    <span>Create Purchase Order</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-[#717973] text-[10px] font-mono uppercase tracking-wider border-b border-[#eaedff]">
                      <th className="py-2.5 px-3.5">PO Number</th>
                      <th className="py-2.5 px-3.5">Vendor Partner</th>
                      <th className="py-2.5 px-3.5">Products / Line Items</th>
                      <th className="py-2.5 px-3.5 text-right">Total Cost</th>
                      <th className="py-2.5 px-3.5 text-center">Status</th>
                      <th className="py-2.5 px-3.5">Due Date</th>
                      <th className="py-2.5 px-3.5 text-right">Settlement Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2f3ff] text-[12px]">
                    {filteredPurchaseOrders.map((po) => (
                      <tr key={po.id} className="hover:bg-[#f2f3ff]/50 transition-colors">
                        {/* PO Number */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <span className="font-mono text-[12px] font-bold text-[#012d1d]">
                            {po.poNumber}
                          </span>
                          <span className="block text-[10px] font-mono text-[#717973]">
                            {po.createdDate}
                          </span>
                        </td>

                        {/* Vendor */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="font-semibold text-[#131b2e]">{po.vendorName}</div>
                          <span className="text-[10px] font-mono text-[#717973]">
                            {po.vendorId}
                          </span>
                        </td>

                        {/* Products */}
                        <td className="py-3 px-3.5">
                          <div className="text-[#131b2e] font-medium">{po.products}</div>
                          <span className="text-[10px] text-[#717973]">{po.deliveryNotes}</span>
                        </td>

                        {/* Total Cost */}
                        <td className="py-3 px-3.5 text-right whitespace-nowrap">
                          <span className="font-mono text-[12px] font-bold text-[#012d1d]">
                            ${(po.totalCost || 0).toFixed(2)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3.5 text-center whitespace-nowrap">
                          {po.status === 'PO Confirmed' && (
                            <span className="inline-flex items-center gap-1 bg-[#e2e7ff] text-[#012d1d] text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a]"></span>
                              PO Confirmed
                            </span>
                          )}
                          {po.status === 'Bill Received' && (
                            <span className="inline-flex items-center gap-1 bg-[#ffdcc3] text-[#2f1500] text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3e1e00]"></span>
                              Bill Received {po.billNumber}
                            </span>
                          )}
                          {po.status === 'Payment Registered' && (
                            <span className="inline-flex items-center gap-1 bg-[#a1f4c8] text-[#1b724f] text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a]"></span>
                              Payment Registered
                            </span>
                          )}
                        </td>

                        {/* Due Date */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <span
                            className={`text-[11px] font-semibold ${
                              po.isUrgent ? 'text-[#ba1a1a]' : 'text-[#131b2e]'
                            }`}
                          >
                            {po.dueDate}
                          </span>
                          <span
                            className={`block text-[10px] font-mono ${
                              po.isUrgent
                                ? 'text-[#ba1a1a]'
                                : po.status === 'Payment Registered'
                                ? 'text-[#116c4a]'
                                : 'text-[#717973]'
                            }`}
                          >
                            {po.paymentTerms}
                          </span>
                        </td>

                        {/* Settlement Action */}
                        <td className="py-3 px-3.5 text-right whitespace-nowrap">
                          {po.status === 'PO Confirmed' && (
                            <button
                              onClick={() => onReceiveBill(po)}
                              className="h-6 px-2.5 bg-[#eaedff] text-[#012d1d] text-[10px] font-mono rounded hover:bg-[#dae2fd] font-semibold transition-colors cursor-pointer"
                            >
                              Receive Bill
                            </button>
                          )}

                          {po.status === 'Bill Received' && (
                            <button
                              onClick={() => {
                                setIsDrawerOpen(true);
                                setDrawerPulse(true);
                                setTimeout(() => setDrawerPulse(false), 900);
                              }}
                              className="h-6 px-2.5 bg-[#012d1d] text-white text-[10px] font-mono rounded hover:bg-[#1b4332] font-semibold transition-colors cursor-pointer"
                            >
                              Register Payment (Bank/Cash)
                            </button>
                          )}

                          {po.status === 'Payment Registered' && (
                            <button
                              onClick={() => onViewVoucher(po)}
                              className="h-6 px-2 bg-[#eaedff] text-[#414844] hover:text-[#012d1d] text-[10px] font-mono rounded transition-colors flex items-center gap-1 cursor-pointer ml-auto"
                            >
                              <span className="material-symbols-outlined text-xs">receipt</span>
                              <span>Voucher</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Slide-Over / Double-Entry Terminal */}
        {isDrawerOpen && (
          <div className={`xl:col-span-4 ${drawerPulse ? 'ring-2 ring-[#116c4a] rounded-xl transition-all' : ''}`}>
            <DoubleEntryDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              activeOrder={selectedOrder}
              onPostSuccess={onPostSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};
