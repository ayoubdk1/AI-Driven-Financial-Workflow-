'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const res = await fetch('/api/invoices');
    const data = await res.json();
    setInvoices(data);
  };

  const handleAction = async (id: number, new_status: string) => {
    await fetch('/api/invoices', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, new_status }),
    });
    // Ba3d ma ta3mel action, n3awdou njibou liste jdida bech el facture tetna7a mel ecran
    fetchInvoices();
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Fintech Dashboard - Pending Reviews</h1>
      <div className="grid gap-4">
        {invoices.length === 0 ? (
          <p className="text-gray-500">No pending invoices. You're all caught up!</p>
        ) : (
          invoices.map((inv) => (
            <div key={inv.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-center bg-white text-black">
              <div>
                <p className="font-semibold text-lg">{inv.vendor_name}</p>
                <p className="text-gray-700">Amount: <span className="font-medium">{inv.total_amount} {inv.currency}</span></p>
                <p className="text-sm text-gray-500">Tax ID: {inv.tax_id}</p>
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => handleAction(inv.id, 'APPROVED')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(inv.id, 'REJECTED')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}