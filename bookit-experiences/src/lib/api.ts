const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';

async function http<T = any>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  getExperiences: () => http('/experiences'),
  getExperience: (id: string | number) => http(`/experiences/${id}`),
  getSlots: (experienceId: string | number) => http(`/slots/${experienceId}`),
  getSlot: (slotId: string | number) => http(`/slots/id/${slotId}`),
  getPromo: (code: string) => http(`/promo/${encodeURIComponent(code)}`),
  createBooking: (payload: any) => http('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
};


