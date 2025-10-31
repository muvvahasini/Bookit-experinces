import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { api } from "../lib/api";
import React from "react";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    api.getExperience(id as string).then(setExperience).catch(() => setExperience(null));
    api.getSlots(id as string).then((data: any[]) => {
      setDates([...(new Set((data || []).map((x: any) => x.date))) as any]);
      setSlots(data || []);
    }).catch(() => { setDates([]); setSlots([]); });
  }, [id]);

  const daySlots = useMemo(() => slots.filter((s: any) => s.date === selectedDate), [slots, selectedDate]);
  const unitPrice = experience?.price ?? 0;
  const subtotal = unitPrice * quantity;
  const taxes = Math.round(subtotal * 0.065);
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-white">
        <Header />
      {/* Arrow Back option */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <div
          className="flex items-center cursor-pointer select-none w-fit mb-4"
          onClick={() => navigate('/')}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="mr-1 -ml-1">
            <path d="M12 15l-5-5 5-5" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[16px] font-medium text-gray-800">Back</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {experience?.image_url && (
              <img src={experience.image_url} className="w-full h-72 md:h-96 object-cover rounded" />
            )}

            <h1 className="text-2xl font-bold mt-6 mb-2">{experience?.name}</h1>

            <p className="text-sm text-gray-600 border rounded px-3 py-3 mb-6">
              Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.
            </p>

            <div className="mb-2 font-semibold">Choose date</div>
            <div className="flex gap-3 mb-6 flex-wrap">
              {dates.map((date) => (
                <button
                  key={date}
                  className={`px-4 py-2 rounded border shadow-md               // <-- Always visible medium shadow
                    transition-transform transition-shadow duration-200
                    hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                    cursor-pointer text-sm ${selectedDate === date ? 'bg-primary text-black' : 'bg-white text-gray-800'}`}
                  onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                >
                  {new Date(date).toLocaleDateString(undefined, { month: 'short', day: '2-digit' })}
                </button>
              ))}
            </div>

            <div className="mb-2 font-semibold">Choose time</div>
            <div className="flex gap-3 flex-wrap mb-2">
              {daySlots.map((slot: any) => {
                const isSold = !slot.available || slot.available <= 0;
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    className={`px-4 py-2 shadow-md               // <-- Always visible medium shadow
                    transition-transform transition-shadow duration-200
                    hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                    cursor-pointer rounded border text-sm relative ${isSold ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isSelected ? 'bg-primary text-black' : 'bg-white'}`}
                    disabled={isSold}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot.time_slot}
                    {!isSold && (
                      <span className="ml-2 text-[10px] text-red-600 border border-red-300 rounded px-1 py-0.5 align-middle">{slot.available} left</span>
                    )}
                    {isSold && (
                      <span className="ml-2 text-[10px] text-gray-500">Sold out</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] text-gray-500 mb-6">All times are in IST (GMT +5:30)</div>

            <div className="mb-2 font-semibold">About</div>
            <div className="border rounded px-3 py-3 text-[13px] text-gray-600">
              Scenic routes, trained guides, and safety briefing. Minimum age 10.
            </div>
          </div>

          <aside className="md:col-span-1">
            <div className="sticky top-24 border rounded-lg p-4 bg-white shadow-sm shadow-md               // <-- Always visible medium shadow
                transition-transform transition-shadow duration-200
                hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                cursor-pointer">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-600">Starts at</span>
                <span className="font-semibold">₹{unitPrice}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-gray-600">Quantity</span>
                <div className="flex items-center gap-3">
                  <button className="px-2 py-1 border rounded" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                  <span>{quantity}</span>
                  <button className="px-2 py-1 border rounded" onClick={() => setQuantity((q) => q + 1)}>+</button>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-600">Taxes</span>
                <span>₹{taxes}</span>
              </div>
              <div className="border-t pt-3 mt-2 flex justify-between font-semibold mb-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button
                className={`w-full shadow-md               // <-- Always visible medium shadow
                transition-transform transition-shadow duration-200
                hover:shadow-lg hover:-translate-y-[2px] hover:border-primary
                cursor-pointer py-2 rounded ${selectedSlot ? 'bg-primary text-black' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                disabled={!selectedSlot}
                onClick={() => selectedSlot && navigate(`/checkout/${selectedSlot.id}`)}
              >
                Confirm
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
