import React from "react";
import { Building2, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminWholesaleRequestsPage() {
  const requests = await prisma.wholesaleCustomer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-champagne/30 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            B2B Wholesale Registrations & Trade Verifications
          </h1>
          <p className="text-xs text-soft-brown font-light mt-0.5">
            Verify retail jeweller credentials, GST numbers, and unlock protected B2B tier catalogue pricing.
          </p>
        </div>
      </div>

      <div className="bg-white border border-champagne/30 rounded-xs shadow-luxury overflow-hidden">
        <div className="p-4 border-b border-champagne/20 bg-ivory/50 flex items-center justify-between">
          <span className="text-xs text-soft-brown font-sans font-semibold">
            Registered B2B Business Partners ({requests.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-charcoal text-ivory uppercase tracking-widest font-serif text-[11px]">
              <tr>
                <th className="p-4">Business & Owner</th>
                <th className="p-4">GST Number</th>
                <th className="p-4">Location</th>
                <th className="p-4">Type</th>
                <th className="p-4">Expected Volume</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-champagne/20 text-soft-brown">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-ivory/50 transition-colors">
                  <td className="p-4 font-sans">
                    <span className="font-serif font-bold text-sm text-charcoal block">{req.businessName}</span>
                    <span className="text-[11px] text-taupe block">Owner: {req.ownerName} | {req.email}</span>
                  </td>
                  <td className="p-4 font-mono font-semibold text-charcoal">{req.gstNumber || "N/A"}</td>
                  <td className="p-4 font-sans">{req.city}, {req.state}</td>
                  <td className="p-4 font-sans uppercase text-[10px] tracking-wider">{req.businessType}</td>
                  <td className="p-4 font-sans">{req.expectedVolume || "N/A"}</td>
                  <td className="p-4 font-sans">
                    <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-xs ${
                      req.status === "APPROVED" ? "bg-emerald/10 text-emerald" : "bg-burgundy/10 text-burgundy"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {req.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="gold" size="sm">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve B2B Access
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest text-emerald font-semibold flex items-center justify-end gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald" /> Verified Partner
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
