import React from 'react';
import { Sparkles, Plus, Check, MapPin, MessageCircle, Star } from 'lucide-react';
import { TreatmentItem, ClinicSettings } from '../types';

interface TreatmentCardProps {
  treatment: TreatmentItem;
  isMemberPrice: boolean;
  isInCart: boolean;
  onToggleCart: (item: TreatmentItem) => void;
  settings: ClinicSettings;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  treatment,
  isMemberPrice,
  isInCart,
  onToggleCart,
  settings,
}) => {
  const activePrice = isMemberPrice ? treatment.memberPrice : treatment.nonMemberPrice;
  const originalPrice = treatment.originalPrice;
  const savingsAmount = originalPrice > activePrice ? originalPrice - activePrice : 0;
  const discountPercent = originalPrice > 0 ? Math.round((savingsAmount / originalPrice) * 100) : 0;

  const waMessage = encodeURIComponent(
    `Halo SOZO Skin Clinic, saya tertarik untuk booking appointment treatment: *${treatment.name}* (Harga: Rp ${activePrice}.000 ${isMemberPrice ? 'Member' : 'Non-Member'}). Mohon informasi jadwal dan cabang terdekat.`
  );

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden relative group ${
      isInCart 
        ? 'border-[#6B1D2F] ring-2 ring-[#6B1D2F]/20 shadow-md' 
        : 'border-stone-200/80 hover:border-stone-300 hover:shadow-md'
    }`}>
      
      {/* Top Banner Badges */}
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          {treatment.skinGoal ? (
            <span className="text-[11px] font-semibold text-[#8C2941] bg-[#FDF2F4] px-2.5 py-0.5 rounded-md">
              {treatment.skinGoal}
            </span>
          ) : <span />}

          <div className="flex items-center gap-1.5">
            {treatment.isNewPromo && (
              <span className="text-[10px] font-extrabold uppercase bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                Promo Baru
              </span>
            )}
            {treatment.badge && (
              <span className="text-[10px] font-bold bg-[#C9A86A]/25 text-[#541523] px-2 py-0.5 rounded-full border border-[#C9A86A]/30">
                {treatment.badge}
              </span>
            )}
          </div>
        </div>

        {/* Treatment Title */}
        <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug group-hover:text-[#6B1D2F] transition">
          {treatment.name}
        </h3>

        {/* Inclusions / Content of Treatment */}
        <div className="mt-3.5 bg-stone-50/90 rounded-xl p-3 border border-stone-100/90">
          <p className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C9A86A]" />
            Isi Rangkaian Treatment:
          </p>
          <ul className="space-y-1.5">
            {treatment.inclusions.map((item, idx) => (
              <li key={idx} className="text-xs text-stone-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B1D2F] mt-1.5 shrink-0"></span>
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outlet Notes if restricted */}
        {treatment.outletNotes && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
            <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="italic">{treatment.outletNotes}</span>
          </div>
        )}
      </div>

      {/* Pricing & Footer Actions */}
      <div className="p-5 pt-4 mt-4 border-t border-stone-100 bg-stone-50/50">
        
        {/* Price display */}
        <div className="flex items-end justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-stone-400 line-through">
                {originalPrice} RB
              </span>
              {discountPercent > 0 && (
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                  Hemat {discountPercent}%
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-extrabold text-[#6B1D2F] tracking-tight">
                {activePrice}
              </span>
              <span className="text-xs font-bold text-[#6B1D2F]">RB</span>
              <span className="text-[11px] text-stone-500 font-medium ml-1">
                ({isMemberPrice ? 'Member' : 'Non-Member'})
              </span>
            </div>
          </div>

          {/* Secondary Price preview */}
          <div className="text-right">
            <span className="text-[10px] text-stone-400 block">
              {isMemberPrice ? 'Non-Member' : 'Harga Member'}
            </span>
            <span className="text-xs font-semibold text-stone-600">
              {isMemberPrice ? `${treatment.nonMemberPrice} RB` : `⭐ ${treatment.memberPrice} RB`}
            </span>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onToggleCart(treatment)}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-300'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Terpilih</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-stone-500" />
                <span>Estimasi</span>
              </>
            )}
          </button>

          <a
            href={`https://wa.me/${settings.csWhatsappNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl bg-[#6B1D2F] hover:bg-[#521523] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#E8BF87]" />
            <span>Booking</span>
          </a>
        </div>

      </div>

    </div>
  );
};
