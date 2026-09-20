import React, { useState } from 'react';

interface HeaderProps {
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  onNewTransaction: () => void;
  onAlertClick: () => void;
  urgentSectorsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDistrict,
  onDistrictChange,
  onNewTransaction,
  onAlertClick,
  urgentSectorsCount = 2,
}) => {
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const districts = [
    'Zone-1 Farm District (North Basin)',
    'Zone-2 East Alluvium District',
    'Zone-3 South Aquifer & Pivot Basin',
    'Zone-4 High Canal Terraces',
  ];

  const notifications = [
    {
      id: 'notif-1',
      title: 'Moisture Deficit Trigger',
      desc: 'Sector 4B (Pivot 03) auto-dispatched #SO-8821 (17.8% SM)',
      time: '12m ago',
      type: 'warning',
    },
    {
      id: 'notif-2',
      title: 'Vendor Bill Due in 2 Days',
      desc: 'Indus Drip Tech Ltd #VB-771 ($1,850.00)',
      time: '1h ago',
      type: 'urgent',
    },
    {
      id: 'notif-3',
      title: 'Settlement Confirmed',
      desc: 'Wire #WT-8120 for Vikram Singh ($1,150.00) verified',
      time: '3h ago',
      type: 'success',
    },
  ];

  return (
    <header
      id="agropulse-header"
      className="fixed top-0 left-72 right-0 h-16 bg-white/95 backdrop-blur-xl z-40 px-4 lg:px-6 flex items-center justify-between border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
    >
      {/* Left side: District Selector & Warning Pill */}
      <div className="flex items-center gap-3 lg:gap-4 flex-wrap">
        {/* District Selector Dropdown */}
        <div className="relative">
          <button
            id="district-selector-btn"
            onClick={() => setDistrictDropdownOpen(!districtDropdownOpen)}
            className="flex items-center gap-2 bg-[#f2f3ff] hover:bg-[#eaedff] px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-left border border-transparent hover:border-[#dae2fd]"
          >
            <span className="material-symbols-outlined text-[#012d1d] text-base">pin_drop</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#717973] font-semibold">
                DISTRICT REGION
              </span>
              <span className="text-[12px] font-semibold text-[#131b2e] leading-tight truncate max-w-[190px] sm:max-w-[260px]">
                {selectedDistrict}
              </span>
            </div>
            <span className="material-symbols-outlined text-[#717973] text-base ml-1">
              expand_more
            </span>
          </button>

          {districtDropdownOpen && (
            <div
              id="district-dropdown-menu"
              className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#eaedff] py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
            >
              <div className="px-3 py-1 text-[10px] font-mono text-[#717973] uppercase font-semibold">
                Available Farm Districts
              </div>
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    onDistrictChange(d);
                    setDistrictDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[12px] hover:bg-[#f2f3ff] transition-colors flex items-center justify-between ${
                    d === selectedDistrict
                      ? 'text-[#012d1d] font-semibold bg-[#eaedff]/50'
                      : 'text-[#414844]'
                  }`}
                >
                  <span className="truncate">{d}</span>
                  {d === selectedDistrict && (
                    <span className="material-symbols-outlined text-xs text-[#116c4a]">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Warning Badge / Moisture Alert Pill */}
        <button
          id="moisture-alert-chip"
          onClick={onAlertClick}
          className="flex items-center gap-1.5 bg-[#ffdcc3] hover:bg-[#ffcaa3] text-[#2f1500] px-3 py-1.5 rounded-full text-[11px] font-mono font-medium transition-all shadow-sm cursor-pointer border border-[#ffb77d]/40"
        >
          <span className="material-symbols-outlined text-sm text-[#6e3900]">warning</span>
          <span>{urgentSectorsCount} Sectors &lt; 20% Moisture (Auto-Pump Armed)</span>
        </button>
      </div>

      {/* Right side: New Transaction, Notifications, User Profile */}
      <div className="flex items-center gap-3">
        {/* New Transaction Button */}
        <button
          id="btn-header-new-transaction"
          onClick={onNewTransaction}
          className="flex items-center gap-1.5 bg-[#012d1d] text-white px-3.5 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-[#1b4332] active:scale-[0.98] transition-all shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span className="whitespace-nowrap">New Transaction</span>
        </button>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button
            id="btn-header-notifications"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative flex items-center justify-center p-2 text-[#414844] hover:text-[#012d1d] hover:bg-[#f2f3ff] rounded-lg transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <span className="material-symbols-outlined text-lg">notifications</span>
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#ba1a1a] text-white rounded-full text-[10px] font-mono font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div
              id="notifications-dropdown-menu"
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#eaedff] py-2 z-50 animate-in fade-in"
            >
              <div className="px-3 py-1.5 border-b border-[#f2f3ff] flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold uppercase text-[#012d1d]">
                  Operational Alerts (3)
                </span>
                <span className="text-[10px] text-[#116c4a] font-medium">Real-time</span>
              </div>
              <div className="divide-y divide-[#f2f3ff] max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-[#f2f3ff] transition-colors">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#131b2e]">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-[#717973] font-mono font-normal">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#414844] mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#eaedff]">
          <img
            alt="Profile Dr. Ramesh S."
            className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c1ecd4]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSS5kG12R4XVmjGdmZb9-AjnooO6n6-EqgYNwTJlPBXZQWf7pcmHorJiKm2FujwDKu_ndDOy3K5V9_-ffdFO_LzDBdt1fS_njDvkfEi3ABEdzD9cxa3NQbjW0FC7AcTckY-49nyFvGDG2ps-ffKRISnlpQ1b_2m2aoGGAOWGGXUiO1oundd6m0BjunHhysyyhdDL6UM5s25fHMxhtcgAlDsEI9GtS6jF5cfB55wFQ0Aipayv3pq_O5yg"
          />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[12px] font-semibold text-[#131b2e] leading-none">
              Dr. Ramesh S.
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-mono text-[#717973] leading-none">
                Agronomy Director
              </span>
              <span className="bg-[#a1f4c8] text-[#1b724f] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full leading-none">
                Regional Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
