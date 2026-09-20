export interface SalesOrder {
  id: string;
  orderNumber: string;
  timestamp: string;
  triggerType: 'telemetry' | 'manual' | 'advisory';
  telemetryRule?: string;
  telemetrySensor?: string;
  soilMoisture?: string;
  customerName: string;
  landDetails: string;
  serviceSku: string;
  serviceDescription: string;
  amount: number;
  rateInfo: string;
  status: 'Auto-Generated' | 'Converted to Invoice' | 'Paid via Bank' | 'Pending Approval';
  invoiceNumber?: string;
  paymentMethod?: string;
  fieldSnapshotUrl?: string;
  ndviScore?: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  createdDate: string;
  vendorName: string;
  vendorId: string;
  products: string;
  deliveryNotes: string;
  totalCost: number;
  status: 'PO Confirmed' | 'Bill Received' | 'Payment Registered' | 'In Transit';
  billNumber?: string;
  dueDate: string;
  paymentTerms: string;
  isUrgent?: boolean;
  paymentRef?: string;
}

export interface LedgerEntry {
  id: string;
  journalNumber: string;
  date: string;
  accountCode: string;
  accountName: string;
  accountClassification: string;
  debit: number;
  credit: number;
  memo: string;
  referenceDoc: string;
}

export interface KpiMetrics {
  openSalesOrdersAmount: number;
  openSalesOrdersCount: number;
  salesAutoTriggeredCount: number;
  salesGrowthPercent: number;
  pendingInvoicesAmount: number;
  pendingInvoicesCount: number;
  openPurchaseOrdersAmount: number;
  openPurchaseOrdersCount: number;
  vendorBillsDueAmount: number;
  vendorBillsDueDays: number;
}

export interface SectorMoisture {
  sectorId: string;
  sectorName: string;
  cropType: string;
  moisturePercent: number;
  thresholdPercent: number;
  pumpStatus: 'Armed' | 'Active' | 'Idle' | 'Standby';
  pivotId: string;
  lastFlowM3: number;
  lastReadingTime: string;
}

export type ActiveNavTab = 'transactions' | 'iot-and-irrigation' | 'master-data' | 'agri-finance';
