import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import Header from '../components/Header';
import React from 'react';


export default function Checkout() {
  const { slotId } = useParams();
  const navigate = useNavigate();
  const [slot, setSlot] = useState<any>(null);
  const [experience, setExperience] = useState<any>(null);

  const [adults, setAdults] = useState(1);
  const [promo, setPromo] = useState('');
  const [discountPct, setDiscountPct] = useState(0);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (!slotId) return;
    api.getSlot(slotId).then(async (s: any) => {
      setSlot(s);
      if (s?.experience_id) {
        const exp = await api.getExperience(s.experience_id);
        setExperience(exp as any);
      }
    }).catch(() => { setSlot(null); setExperience(null); });
  }, [slotId]);

  const unitPrice = experience?.price ?? 0;
  const subtotal = unitPrice * adults;
  const discount = Math.round((subtotal * discountPct) / 100);
  const taxes = Math.round(subtotal * 0.06); // Screenshot shows 59 taxes; adjust as needed
  const total = Math.max(0, subtotal - discount + taxes);

  async function applyPromo() {
    if (!promo) return;
    try {
      const data: any = await api.getPromo(promo);
      if (data && data.active) setDiscountPct(data.discount_percent || 0); else setDiscountPct(0);
    } catch {
      setDiscountPct(0);
    }
  }

  async function handlePay() {
    if (!slot || !experience || !userName || !userEmail || !agree) return;
    await api.createBooking({
      experience_slot_id: slot.id,
      user_name: userName,
      user_email: userEmail,
      promo_code: promo || null,
      price: total
    });
    navigate('/confirmation');
  }

  const dateLabel = useMemo(() => (slot ? slot.date : ''), [slot]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-20">
        <div className="flex items-center gap-2 mb-8 select-none">
          <button onClick={() => navigate('/')} className="mr-1 -ml-2 flex items-center">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <path d="M14 17l-6-6 6-6" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-semibold text-[17px] text-gray-800">Checkout</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          <div>
            <div className="bg-gray-50 rounded-xl p-6 mb-3 flex flex-col gap-4 shadow-md               // <-- Always visible medium shadow
                transition-transform transition-shadow duration-200
                hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                cursor-pointer">
              {/* Name/Email Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Full name</label>
                  <input
                    className="w-full border rounded px-3 py-2 text-base"
                    placeholder="John Doe"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    className="w-full border rounded px-3 py-2 text-base"
                    placeholder="test@test.com"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* Promo Row */}
              <div className="flex gap-3">
                <input
                  className="border rounded px-3 py-2 flex-1 text-base"
                  placeholder="Promo code"
                  value={promo}
                  onChange={e => setPromo(e.target.value)}
                />
                <button
                  onClick={applyPromo}
                  className="px-5 py-2 bg-black text-white rounded font-medium shadow-md               // <-- Always visible medium shadow
                    transition-transform transition-shadow duration-200
                    hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                    cursor-pointer"
                >
                  Apply
                </button>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  className="accent-black"
                  checked={agree}
                  onChange={e => setAgree(e.target.checked)}
                  id="agree"
                />
                <label htmlFor="agree" className="text-[13px] text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </div>
          {/* Summary Card */}
          <div>
            {experience && slot ? (
              <div className="bg-white shadow-md               // <-- Always visible medium shadow
                transition-transform transition-shadow duration-200
                hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                cursor-pointer rounded-xl p-7 shadow-sm border min-w-[300px] w-full max-w-sm mx-auto">
                <div className="flex justify-between text-gray-500 text-sm mb-2">
                  <span>Experience</span>
                  <span className="font-medium text-gray-700">{experience.name}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm mb-2">
                  <span>Date</span>
                  <span>{dateLabel}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm mb-2">
                  <span>Time</span>
                  <span>{slot.time_slot}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm mb-2">
                  <span>Qty</span>
                  <span>{adults}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm mb-2">
                  <span>Taxes</span>
                  <span>₹{taxes}</span>
                </div>
                {discountPct > 0 && (
                  <div className="flex justify-between text-green-700 text-sm mb-2">
                    <span>Discount ({discountPct}%)</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-2 flex justify-between font-bold text-xl mb-4">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button
                  className="shadow-md               // <-- Always visible medium shadow
                  transition-transform transition-shadow duration-200
                  hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                  cursor-pointer w-full py-3 rounded bg-[#ffe059] hover:bg-[#ffd600] text-black text-base font-medium transition"
                  disabled={!agree || !userName || !userEmail}
                  onClick={handlePay}
                >
                  Pay and Confirm
                </button>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
