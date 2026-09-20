import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TransactionsView } from './components/TransactionsView';
import { IotIrrigationView } from './components/IotIrrigationView';
import { MasterDataView } from './components/MasterDataView';
import { AgriFinanceView } from './components/AgriFinanceView';
import { NewTransactionModal } from './components/NewTransactionModal';
import { LedgerRulesModal } from './components/LedgerRulesModal';
import { ExportLedgerModal } from './components/ExportLedgerModal';
import { SettingsModal, DocsModal } from './components/SettingsModal';
import { VoucherModal } from './components/VoucherModal';
import { INITIAL_SALES_ORDERS, INITIAL_PURCHASE_ORDERS, MOCK_SECTORS } from './mockData';
import { ActiveNavTab, SalesOrder, PurchaseOrder, SectorMoisture } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('transactions');
  const [selectedDistrict, setSelectedDistrict] = useState('Zone-1 Farm District (North Basin)');
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [sectors, setSectors] = useState<SectorMoisture[]>([]);

  // Modals state
  const [isNewTxOpen, setIsNewTxOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [voucherPo, setVoucherPo] = useState<PurchaseOrder | null>(null);

  // System toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  React.useEffect(() => {
    fetch('http://localhost:8080/api/sales-orders')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSalesOrders(data); })
      .catch(console.error);
      
    fetch('http://localhost:8080/api/purchase-orders')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPurchaseOrders(data); })
      .catch(console.error);
      
    fetch('http://localhost:8080/api/sectors')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSectors(data); })
      .catch(console.error);
  }, []);

  // Convert Sales Order to Invoice
  const handleConvertInvoice = async (so: SalesOrder) => {
    const invNumber = 'INV-' + Math.floor(1093 + Math.random() * 20);
    const updated = { ...so, status: 'Converted to Invoice', invoiceNumber: invNumber };
    try {
      const res = await fetch(`http://localhost:8080/api/sales-orders/${so.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setSalesOrders((prev) => prev.map((item) => item.id === so.id ? updated : item));
        showToast(`Order ${so.orderNumber} successfully converted to Invoice #${invNumber}`);
      }
    } catch (e) { console.error(e); }
  };

  // Generate all pending invoices
  const handleGenerateBulkInvoices = () => {
    let count = 0;
    salesOrders.forEach(async (item) => {
      if (item.status === 'Auto-Generated') {
        count++;
        const updated = { ...item, status: 'Converted to Invoice', invoiceNumber: 'INV-' + Math.floor(1095 + Math.random() * 30) };
        try {
          const res = await fetch(`http://localhost:8080/api/sales-orders/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
          });
          if (res.ok) {
            setSalesOrders((prev) => prev.map((so) => so.id === item.id ? updated : so));
          }
        } catch (e) { console.error(e); }
      }
    });
    setTimeout(() => showToast(`Batch run complete: ${count || 4} unbilled irrigation dispatches converted to Invoices`), 500);
  };

  // Post to General Ledger
  const handlePostSuccess = async (journalId: string, orderId?: string) => {
    if (orderId) {
      const so = salesOrders.find(s => s.id === orderId);
      if (so) {
        const updated = { ...so, status: 'Paid via Bank', paymentMethod: 'Bank Journal ****4910' };
        try {
          const res = await fetch(`http://localhost:8080/api/sales-orders/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
          });
          if (res.ok) {
            setSalesOrders((prev) => prev.map((item) => item.id === orderId ? updated : item));
          }
        } catch (e) { console.error(e); }
      }
    }
    showToast(`Double-entry reconciliation confirmed: General Ledger entry ${journalId} committed`);
  };

  // Receive vendor bill
  const handleReceiveBill = async (po: PurchaseOrder) => {
    const billNum = '#VB-' + Math.floor(772 + Math.random() * 50);
    const updated = { ...po, status: 'Bill Received', billNumber: billNum, isUrgent: true, dueDate: 'Nov 02, 2024', paymentTerms: 'Due in 3 days' };
    try {
      const res = await fetch(`http://localhost:8080/api/purchase-orders/${po.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        setPurchaseOrders((prev) => prev.map((item) => item.id === po.id ? updated : item));
        showToast(`Vendor bill ${billNum} recognized for ${po.vendorName} ($${po.totalCost})`);
      }
    } catch (e) { console.error(e); }
  };

  // View Voucher
  const handleViewVoucher = (po: PurchaseOrder) => {
    setVoucherPo(po);
  };

  // Create new Sales Order
  const handleCreateSalesOrder = async (so: SalesOrder) => {
    try {
      const res = await fetch('http://localhost:8080/api/sales-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(so)
      });
      if (res.ok) {
        const saved = await res.json();
        setSalesOrders((prev) => [saved, ...prev]);
        showToast(`New Sales Order ${so.orderNumber} created for ${so.customerName}`);
      }
    } catch (e) { console.error(e); }
  };

  // Create new Purchase Order
  const handleCreatePurchaseOrder = async (po: PurchaseOrder) => {
    try {
      const res = await fetch('http://localhost:8080/api/purchase-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(po)
      });
      if (res.ok) {
        const saved = await res.json();
        setPurchaseOrders((prev) => [saved, ...prev]);
        showToast(`Purchase Order ${po.poNumber} issued to ${po.vendorName}`);
      }
    } catch (e) { console.error(e); }
  };

  // Simulate Sector 4B Moisture Deficit Alert
  const handleTriggerDeficitAlert = (sector: SectorMoisture) => {
    setSectors((prev) =>
      prev.map((s) =>
        s.sectorId === sector.sectorId
          ? { ...s, moisturePercent: 16.9, pumpStatus: 'Active', lastFlowM3: 480 }
          : s
      )
    );

    const autoSo: SalesOrder = {
      id: 'so-telemetry-' + Date.now(),
      orderNumber: '#SO-' + Math.floor(8822 + Math.random() * 50),
      timestamp: 'Just now',
      triggerType: 'telemetry',
      telemetryRule: 'Telemetry Rule R-04: Sector 4B < 20%',
      telemetrySensor: 'Sensor Node #NS-04B-91 (16.9% SM)',
      soilMoisture: '16.9%',
      customerName: 'Ramesh Patel',
      landDetails: 'Plot 12-West • 40 Ha',
      serviceSku: 'Precision Irrigation Water (480 m³)',
      serviceDescription: 'Automated Pivot 03 Run',
      amount: 724.8,
      rateInfo: 'Rate: $1.51/m³',
      status: 'Auto-Generated',
      invoiceNumber: 'INV-1094',
      ndviScore: 0.74,
      fieldSnapshotUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAiWilS7O5saA811DKvdCTBfqWmTM_680mEINIPXEt6NOtyvPR5n5BzAVINLN12FHpLgv1IqHsYQPSvz4Ezh8KUyxlRywoFgCG8KdDYvg8v6jPFYphktBaPkb0gGBLGccTZxM06VH_aLCVHqDYoyeMM8XLAVASoAXULH91Z-y1btYmfzbC-vxkBgEZOR7meHk4vt9WLhwcvP0xe4qOxFo6uFvvclazEs25Xj1cvMrWnK-1oZm03zOFB9g',
    };

    handleCreateSalesOrder(autoSo);
    setActiveTab('transactions');
    showToast(`CRITICAL ALERT: Sector 4B dropped to 16.9% SM! Auto-pump armed & ${autoSo.orderNumber} dispatched.`);
  };

  const urgentCount = sectors.filter((s) => (s.moisturePercent ?? 0) < (s.thresholdPercent ?? 0)).length;

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex">
      {/* Fixed Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Main Container */}
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        {/* Fixed Top Header */}
        <Header
          selectedDistrict={selectedDistrict}
          onDistrictChange={(d) => setSelectedDistrict(d)}
          onNewTransaction={() => setIsNewTxOpen(true)}
          onAlertClick={() => setActiveTab('iot-and-irrigation')}
          urgentSectorsCount={urgentCount}
        />

        {/* Dynamic Main View */}
        <main className="w-full pt-16 bg-[#faf8ff] flex-1">
          {activeTab === 'transactions' && (
            <TransactionsView
              salesOrders={salesOrders}
              purchaseOrders={purchaseOrders}
              onOpenLedgerRules={() => setIsRulesOpen(true)}
              onOpenExport={() => setIsExportOpen(true)}
              onOpenNewTransaction={() => setIsNewTxOpen(true)}
              onConvertInvoice={handleConvertInvoice}
              onPostSuccess={handlePostSuccess}
              onGenerateBulkInvoices={handleGenerateBulkInvoices}
              onReceiveBill={handleReceiveBill}
              onViewVoucher={handleViewVoucher}
            />
          )}

          {activeTab === 'iot-and-irrigation' && (
            <IotIrrigationView
              sectors={sectors}
              onTriggerDeficitAlert={handleTriggerDeficitAlert}
              onNavigateTransactions={() => setActiveTab('transactions')}
            />
          )}

          {activeTab === 'master-data' && <MasterDataView />}

          {activeTab === 'agri-finance' && (
            <AgriFinanceView onRegisterPayment={() => setIsNewTxOpen(true)} />
          )}
        </main>
      </div>

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div
          id="system-toast"
          className="fixed bottom-4 right-4 z-50 bg-[#012d1d] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-[#116c4a] flex items-center gap-2.5 text-[12px] font-medium animate-in slide-in-from-bottom-2"
        >
          <span className="material-symbols-outlined text-sm text-[#a1f4c8]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <NewTransactionModal
        isOpen={isNewTxOpen}
        onClose={() => setIsNewTxOpen(false)}
        onCreateSalesOrder={handleCreateSalesOrder}
        onCreatePurchaseOrder={handleCreatePurchaseOrder}
      />

      <LedgerRulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      <ExportLedgerModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        salesOrders={salesOrders}
        purchaseOrders={purchaseOrders}
      />

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      <DocsModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />

      <VoucherModal
        isOpen={voucherPo !== null}
        onClose={() => setVoucherPo(null)}
        order={voucherPo}
      />
    </div>
  );
}
