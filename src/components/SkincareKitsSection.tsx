import React from 'react';
import { Package, Gift, Sparkles, MessageCircle, Check } from 'lucide-react';
import { SkincareKit, ClinicSettings } from '../types';

interface SkincareKitsSectionProps {
  kits: SkincareKit[];
  settings: ClinicSettings;
}

export const SkincareKitsSection: React.FC<SkincareKitsSectionProps> = ({
  kits,
  settings,
}) => {
  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#F7EADB] text-[#6B1D2F]">
              Buku BAU Hal. 82 - 85
            </span>
            <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Gift className="w-3 h-3 text-[#6B1D2F]" />
              FREE Exclusive SOZO Pouch
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Paket Skincare Kit Bundling
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Formula dermatologis teruji klinis untuk perawatan harian di rumah. Sudah termasuk PPN 11%.
          </p>
        </div>

        {/* Free gift banner */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-3.5 rounded-2xl border border-rose-200 text-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6B1D2F] text-[#E8BF87] flex items-center justify-center font-bold">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-[#6B1D2F] block">BONUS FREE POUCH</span>
            <span className="text-stone-600 text-[11px]">Setiap pembelian paket skincare di seluruh klinik</span>
          </div>
        </div>
      </div>

      {/* Skincare Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {kits.map((kit) => {
          const discount = kit.originalPrice > kit.promoPrice 
            ? Math.round((1 - (kit.promoPrice / kit.originalPrice)) * 100) 
            : 0;

          return (
            <div
              key={kit.id}
              className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                    Skincare BPOM
                  </span>
                  {kit.freeGift && (
                    <span className="text-[10px] font-bold bg-[#C9A86A]/20 text-[#6B1D2F] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Gift className="w-3 h-3 text-[#6B1D2F]" />
                      {kit.freeGift}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                  {kit.name}
                </h3>

                {/* Items in kit */}
                <div className="mt-3 bg-stone-50 rounded-xl p-3 border border-stone-100">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                    Isi Paket Skincare:
                  </p>
                  <ul className="space-y-1">
                    {kit.items.map((item, idx) => (
                      <li key={idx} className="text-xs text-stone-700 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price and Action */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-stone-400 line-through">
                      {formatRupiah(kit.originalPrice)}
                    </span>
                    {discount > 0 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded">
                        Hemat {discount}%
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-extrabold text-[#6B1D2F] mt-0.5">
                    {formatRupiah(kit.promoPrice)}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${settings.csWhatsappNumber}?text=${encodeURIComponent(
                    `Halo SOZO Skin Clinic, saya ingin pesan paket skincare: *${kit.name}* (${formatRupiah(kit.promoPrice)}). Mohon info ketersediaan stok.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#6B1D2F] hover:bg-[#521523] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#E8BF87]" />
                  <span>Pesan Sekarang</span>
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
