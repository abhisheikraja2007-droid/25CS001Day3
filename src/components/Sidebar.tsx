import React from 'react';
import { ActiveNavTab } from '../types';

interface SidebarProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  onOpenSettings: () => void;
  onOpenDocs: () => void;
  meshOnlineCount?: number;
  totalMeshNodes?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenSettings,
  onOpenDocs,
  meshOnlineCount = 48,
  totalMeshNodes = 48,
}) => {
  return (
    <aside
      id="agropulse-sidebar"
      className="fixed left-0 top-0 bottom-0 w-72 bg-white flex flex-col z-50 border-r border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none"
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center gap-3 bg-white border-b border-[#f2f3ff]">
        <img
          alt="AgroPulse Logo"
          className="h-8 w-auto object-contain"
          src="https://lh3.googleusercontent.com/aida/AEtjO1UOkBQ0I5ThAUAzOrpRmb5CoXTVaOgaQlNT8XK08SsdJnO3fQbR_zrExK3SDokz6Nex3955syQT2nD1xdpuC7YFiBZtkYEOy4oKgWzo9TYFkGaCltkPwt-cy16bweDe6LXnB0lOf3-eaTxgEp08aNNmzsDzBGIkeGURhnNYux7y--r4ddcUt486Ndc6pBuSndx9tLJMvjOXnC8BjygunxWq_aQgeigM4H1_gajvZieDiYhlGl2lvRtxvEB4"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-[15px] leading-tight text-[#012d1d] tracking-tight truncate">
            AgroPulse ERP
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#717973] truncate">
            Precision IoT & Agri-Ledger
          </span>
        </div>
      </div>

      {/* Enterprise Navigation Section Label */}
      <div className="px-4 py-2">
        <div className="px-1 text-[10px] font-mono text-[#717973] uppercase tracking-wider font-semibold">
          Enterprise Navigation
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <button
          id="nav-iot-irrigation"
          onClick={() => onTabChange('iot-and-irrigation')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left text-[13px] ${
            activeTab === 'iot-and-irrigation'
              ? 'bg-[#1b4332] text-[#86af99] font-semibold shadow-sm'
              : 'text-[#414844] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-base">sensors</span>
          <span>IoT & Irrigation</span>
        </button>

        <button
          id="nav-transactions"
          onClick={() => onTabChange('transactions')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left text-[13px] ${
            activeTab === 'transactions'
              ? 'bg-[#1b4332] text-[#86af99] font-semibold shadow-sm'
              : 'text-[#414844] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-base">receipt_long</span>
          <span>Transactions</span>
        </button>

        <button
          id="nav-master-data"
          onClick={() => onTabChange('master-data')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left text-[13px] ${
            activeTab === 'master-data'
              ? 'bg-[#1b4332] text-[#86af99] font-semibold shadow-sm'
              : 'text-[#414844] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-base">dataset</span>
          <span>Master Data</span>
        </button>

        <button
          id="nav-agri-finance"
          onClick={() => onTabChange('agri-finance')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left text-[13px] ${
            activeTab === 'agri-finance'
              ? 'bg-[#1b4332] text-[#86af99] font-semibold shadow-sm'
              : 'text-[#414844] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-base">account_balance</span>
          <span>Agri-Finance</span>
        </button>
      </nav>

      {/* Footer / Telemetry Status Card */}
      <div className="p-3 bg-[#f2f3ff] space-y-2 border-t border-[#eaedff]">
        <div className="bg-white p-2.5 rounded-lg space-y-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.02)] border border-[#eaedff]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#717973] uppercase font-semibold">
              Mesh Telemetry
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#116c4a] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#116c4a] animate-pulse"></span>
              Online
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono text-[#131b2e]">
            <span>IoT Mesh Nodes:</span>
            <span className="font-semibold text-[#012d1d]">
              {meshOnlineCount}/{totalMeshNodes} Online
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-[#717973]">
            <span>Ingest Rate:</span>
            <span className="text-[#131b2e] font-medium">3.2k rec/min</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <button
            id="btn-settings"
            onClick={onOpenSettings}
            className="flex items-center gap-1 text-[12px] text-[#414844] hover:text-[#012d1d] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Settings</span>
          </button>
          <button
            id="btn-docs"
            onClick={onOpenDocs}
            className="flex items-center gap-1 text-[12px] text-[#414844] hover:text-[#012d1d] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">menu_book</span>
            <span>Docs</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
