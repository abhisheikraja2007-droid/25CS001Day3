import React, { useState } from 'react';
import { SalesOrder, PurchaseOrder } from '../types';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSalesOrder: (so: SalesOrder) => void;
  onCreatePurchaseOrder: (po: PurchaseOrder) => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  onCreateSalesOrder,
  onCreatePurchaseOrder,
}) => {
  const [transactionType, setTransactionType] = useState<'sales' | 'procurement'>('sales');

  // Sales Order Form
  const [customerName, setCustomerName] = useState('Ramesh Patel');
  const [landDetails, setLandDetails] = useState('Plot 12-West • 40 Ha');
  const [serviceSku, setServiceSku] = useState('Precision Irrigation Water (450 m³)');
  const [serviceDesc, setServiceDesc] = useState('Automated Pivot 03 Run');
  const [amount, setAmount] = useState('680.00');
  const [triggerType, setTriggerType] = useState<'telemetry' | 'manual' | 'advisory'>('telemetry');

  // Purchase Order Form
  const [vendorName, setVendorName] = useState('AgriSupplies Co.');
  const [vendorId, setVendorId] = useState('VN-0092');
  const [poProduct, setPoProduct] = useState('NPK Fertilizer 50kg (120 Bags)');
  const [deliveryNotes, setDeliveryNotes] = useState('Delivered to Central Silo 2');
  const [poCost, setPoCost] = useState('6400.00');
  const [paymentTerms, setPaymentTerms] = useState('Net 15 Terms');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transactionType === 'sales') {
      const newSo: SalesOrder = {
        id: 'so-' + Date.now(),
        orderNumber: '#SO-' + Math.floor(8822 + Math.random() * 100),
        timestamp: 'Just now',
        triggerType,
        telemetryRule:
          triggerType === 'telemetry'
            ? 'Telemetry Rule R-04: Sector 4B < 20%'
            : triggerType === 'manual'
            ? 'Manual Request'
            : 'Agronomy Advisory Schedule',
        telemetrySensor:
          triggerType === 'telemetry'
            ? 'Sensor Node #NS-04B-91 (17.8% SM)'
            : 'Field Tech: Direct Dispatch',
        customerName,
        landDetails,
        serviceSku,
        serviceDescription: serviceDesc,
        amount: parseFloat(amount) || 0,
        rateInfo: 'Rate: $1.51/m³',
        status: 'Auto-Generated',
        invoiceNumber: 'INV-' + Math.floor(1093 + Math.random() * 50),
        ndviScore: 0.76,
      };
      onCreateSalesOrder(newSo);
    } else {
      const newPo: PurchaseOrder = {
        id: 'po-' + Date.now(),
        poNumber: '#PO-' + Math.floor(4403 + Math.random() * 50),
        createdDate: 'Created Today',
        vendorName,
        vendorId: `Vendor ID: #${vendorId}`,
        products: poProduct,
        deliveryNotes,
        totalCost: parseFloat(poCost) || 0,
        status: 'PO Confirmed',
        dueDate: 'Nov 12, 2024',
        paymentTerms,
      };
      onCreatePurchaseOrder(newPo);
    }
    onClose();
  };

  return (
    <div
      id="new-transaction-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#eaedff]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#f2f3ff] border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-lg">add_circle</span>
            <div>
              <h3 className="font-semibold text-[15px] text-[#012d1d]">
                Create New ERP Transaction
              </h3>
              <p className="text-[11px] text-[#717973] font-mono">
                Commercial pipeline & ledger registry
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

        {/* Transaction Type Tabs */}
        <div className="p-4 space-y-4">
          <div className="flex bg-[#f2f3ff] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setTransactionType('sales')}
              className={`flex-1 py-1.5 rounded text-[12px] font-semibold transition-all ${
                transactionType === 'sales'
                  ? 'bg-white text-[#012d1d] shadow-sm'
                  : 'text-[#717973] hover:text-[#131b2e]'
              }`}
            >
              Sales Order (Farmer Services)
            </button>
            <button
              type="button"
              onClick={() => setTransactionType('procurement')}
              className={`flex-1 py-1.5 rounded text-[12px] font-semibold transition-all ${
                transactionType === 'procurement'
                  ? 'bg-white text-[#012d1d] shadow-sm'
                  : 'text-[#717973] hover:text-[#131b2e]'
              }`}
            >
              Purchase Order (Supplies)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {transactionType === 'sales' ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                      Customer / Farmer
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                      Land & Plot Details
                    </label>
                    <input
                      type="text"
                      value={landDetails}
                      onChange={(e) => setLandDetails(e.target.value)}
                      required
                      className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                    Service / Product SKU
                  </label>
                  <input
                    type="text"
                    value={serviceSku}
                    onChange={(e) => setServiceSku(e.target.value)}
                    required
                    className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                      Trigger Source
                    </label>
                    <select
                      value={triggerType}
                      onChange={(e) => setTriggerType(e.target.value as any)}
                      className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a]"
                    >
                      <option value="telemetry">IoT Telemetry Deficit Rule</option>
                      <option value="manual">Manual Technician Request</option>
                      <option value="advisory">Agronomy Advisory Schedule</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                      Total Amount (USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a] font-mono"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                      Vendor Partner Name
                    </label>
                    <input
                      type="text"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      required
                      className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                      Vendor Identifier
                    </label>
                    <input
                      type="text"
                      value={vendorId}
                      onChange={(e) => setVendorId(e.target.value)}
                      required
                      className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                    Products & Delivery Silo
                  </label>
                  <input
                    type="text"
                    value={poProduct}
                    onChange={(e) => setPoProduct(e.target.value)}
                    required
                    className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                      Total Cost (USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={poCost}
                      onChange={(e) => setPoCost(e.target.value)}
                      required
                      className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#414844] mb-1 font-semibold">
                      Payment Terms
                    </label>
                    <input
                      type="text"
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      className="w-full h-8 bg-[#f2f3ff] text-[12px] px-2.5 rounded-lg border border-[#eaedff] focus:outline-none focus:ring-1 focus:ring-[#116c4a]"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="pt-3 border-t border-[#eaedff] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-[12px] text-[#414844] hover:bg-[#f2f3ff] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-[12px] font-semibold bg-[#012d1d] text-white hover:bg-[#1b4332] rounded-lg transition-colors shadow-sm"
              >
                Save &amp; Generate Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
