import React, { useState } from 'react';

interface AgriFinanceViewProps {
  onRegisterPayment: () => void;
}

export const AgriFinanceView: React.FC<AgriFinanceViewProps> = ({ onRegisterPayment }) => {
  const [activeTab, setActiveTab] = useState<'gl' | 'coa' | 'hedging'>('gl');

  const chartOfAccounts = [
    { code: '1010', name: 'State Agricultural Bank - Main Operating', type: 'Asset (Current)', balance: '$148,920.00', debitCredit: 'Debit' },
    { code: '1020', name: 'Operating Cash Vault (On-Farm Safe #01)', type: 'Asset (Current)', balance: '$12,450.00', debitCredit: 'Debit' },
    { code: '1200', name: 'Accounts Receivable (Farmer Ledgers)', type: 'Asset (Current)', balance: '$14,200.00', debitCredit: 'Debit' },
    { code: '1300', name: 'Irrigation & Hardware Spares Inventory', type: 'Asset (Current)', balance: '$34,800.00', debitCredit: 'Debit' },
    { code: '2010', name: 'Accounts Payable (Suppliers & Utilities)', type: 'Liability (Current)', balance: '$18,920.00', debitCredit: 'Credit' },
    { code: '3010', name: 'Farm Enterprise Capital & Retained Reserves', type: 'Equity', balance: '$162,340.00', debitCredit: 'Credit' },
    { code: '4010', name: 'Precision Irrigation Service Revenue', type: 'Revenue', balance: '$72,400.00', debitCredit: 'Credit' },
    { code: '5010', name: 'Canal Concessions & Water Utilities', type: 'Expense', balance: '$28,100.00', debitCredit: 'Debit' },
  ];

  const recentJournals = [
    { id: 'JRN-8841', date: '2024-10-25', doc: 'INV-1092', desc: 'Ramesh Patel Sector 4B Pivot 03 discharge settlement', drAccount: '1010 - State Agri Bank', crAccount: '1200 - Accounts Receivable', amount: 680.0, status: 'Posted' },
    { id: 'JRN-8840', date: '2024-10-24', doc: 'INV-1088', desc: 'Wire settlement Vikram Singh NPK advisory run', drAccount: '1010 - State Agri Bank', crAccount: '4020 - Agronomic Advisory Revenue', amount: 1150.0, status: 'Posted' },
    { id: 'JRN-8839', date: '2024-10-20', doc: 'PO-4399', desc: 'Quarterly Canal Concession allocation settlement', drAccount: '5010 - Water Utilities Expense', crAccount: '1010 - State Agri Bank', amount: 12200.0, status: 'Posted' },
    { id: 'JRN-8838', date: '2024-10-18', doc: 'VB-771', desc: 'Vendor liability recognition Indus Drip Tech valves', drAccount: '1300 - Irrigation Inventory', crAccount: '2010 - Accounts Payable', amount: 1850.0, status: 'Posted' },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#eaedff] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#116c4a] font-bold">
              Institutional Agri-Finance &amp; Audit
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a]"></span>
            <span className="text-[10px] font-mono text-[#717973]">GAAP Standard 401 Engine</span>
          </div>
          <h1 className="text-[24px] font-bold text-[#012d1d] tracking-tight">
            Double-Entry General Ledger &amp; Chart of Accounts
          </h1>
          <p className="text-[12px] text-[#414844]">
            Automated double-entry booking from IoT meters, bank integrations &amp; hedging accounts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRegisterPayment}
            className="h-8 px-3 bg-[#012d1d] text-white text-[12px] font-semibold rounded-lg hover:bg-[#1b4332] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">add_card</span>
            <span>New General Ledger Entry</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('gl')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
            activeTab === 'gl'
              ? 'bg-[#012d1d] text-white shadow-xs'
              : 'bg-[#f2f3ff] text-[#414844] hover:text-[#131b2e]'
          }`}
        >
          General Ledger Journal Feed
        </button>
        <button
          onClick={() => setActiveTab('coa')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
            activeTab === 'coa'
              ? 'bg-[#012d1d] text-white shadow-xs'
              : 'bg-[#f2f3ff] text-[#414844] hover:text-[#131b2e]'
          }`}
        >
          Chart of Accounts (8 Accounts)
        </button>
        <button
          onClick={() => setActiveTab('hedging')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
            activeTab === 'hedging'
              ? 'bg-[#012d1d] text-white shadow-xs'
              : 'bg-[#f2f3ff] text-[#414844] hover:text-[#131b2e]'
          }`}
        >
          Commodities Hedging Escrow
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-[#eaedff] shadow-xs overflow-hidden">
        {activeTab === 'gl' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead>
                <tr className="bg-[#f2f3ff] text-[#717973] font-mono text-[10px] uppercase border-b border-[#eaedff]">
                  <th className="py-2.5 px-3.5">Journal #</th>
                  <th className="py-2.5 px-3.5">Posting Date</th>
                  <th className="py-2.5 px-3.5">Document Ref</th>
                  <th className="py-2.5 px-3.5">Transaction Narrative</th>
                  <th className="py-2.5 px-3.5">Debit Account</th>
                  <th className="py-2.5 px-3.5">Credit Account</th>
                  <th className="py-2.5 px-3.5 text-right">Amount (USD)</th>
                  <th className="py-2.5 px-3.5 text-center">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f3ff]">
                {recentJournals.map((j) => (
                  <tr key={j.id} className="hover:bg-[#f2f3ff]/50 transition-colors">
                    <td className="py-3 px-3.5 font-mono font-bold text-[#012d1d]">{j.id}</td>
                    <td className="py-3 px-3.5 text-[#717973] font-mono">{j.date}</td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-[#131b2e]">{j.doc}</td>
                    <td className="py-3 px-3.5 text-[#131b2e]">{j.desc}</td>
                    <td className="py-3 px-3.5 font-mono text-[11px] text-[#116c4a] font-semibold">
                      {j.drAccount}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-[11px] text-[#012d1d]">
                      {j.crAccount}
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono font-bold text-[#012d1d]">
                      ${j.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-3.5 text-center">
                      <span className="bg-[#a1f4c8] text-[#1b724f] text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                        GAAP √
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'coa' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead>
                <tr className="bg-[#f2f3ff] text-[#717973] font-mono text-[10px] uppercase border-b border-[#eaedff]">
                  <th className="py-2.5 px-3.5">Code</th>
                  <th className="py-2.5 px-3.5">Account Title</th>
                  <th className="py-2.5 px-3.5">Accounting Classification</th>
                  <th className="py-2.5 px-3.5">Normal Balance</th>
                  <th className="py-2.5 px-3.5 text-right">Current Ledger Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f3ff]">
                {chartOfAccounts.map((a) => (
                  <tr key={a.code} className="hover:bg-[#f2f3ff]/50 transition-colors">
                    <td className="py-3 px-3.5 font-mono font-bold text-[#012d1d]">{a.code}</td>
                    <td className="py-3 px-3.5 font-semibold text-[#131b2e]">{a.name}</td>
                    <td className="py-3 px-3.5 text-[#414844]">{a.type}</td>
                    <td className="py-3 px-3.5 font-mono text-[11px] text-[#717973]">
                      {a.debitCredit}
                    </td>
                    <td className="py-3 px-3.5 text-right font-mono font-bold text-[#012d1d]">
                      {a.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'hedging' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-[#eaedff] bg-[#faf8ff]">
                <span className="text-[10px] font-mono text-[#717973] uppercase font-semibold">
                  Wheat Forward Contract Dec 2024
                </span>
                <div className="text-[20px] font-mono font-bold text-[#012d1d] mt-1">
                  $7.42 / Bushel
                </div>
                <span className="text-[11px] text-[#116c4a] font-semibold block mt-1">
                  Hedged: 85,000 Bushels (Sector 4B &amp; 1C)
                </span>
              </div>
              <div className="p-4 rounded-xl border border-[#eaedff] bg-[#faf8ff]">
                <span className="text-[10px] font-mono text-[#717973] uppercase font-semibold">
                  Water Escrow Liquidity Reserve
                </span>
                <div className="text-[20px] font-mono font-bold text-[#116c4a] mt-1">
                  $45,000.00
                </div>
                <span className="text-[11px] text-[#717973] block mt-1">
                  Government Canal Concession Lock
                </span>
              </div>
              <div className="p-4 rounded-xl border border-[#eaedff] bg-[#faf8ff]">
                <span className="text-[10px] font-mono text-[#717973] uppercase font-semibold">
                  Dual Entry Balance Verification
                </span>
                <div className="text-[20px] font-mono font-bold text-[#012d1d] mt-1">
                  $242,570.00
                </div>
                <span className="text-[11px] text-[#116c4a] font-semibold flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  Total Debits === Total Credits
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
