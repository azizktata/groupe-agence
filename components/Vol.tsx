import { ArrowLeft, Luggage, Plane } from 'lucide-react';
import React from 'react'

export default function Vol({flight}: {flight: {
    id: number;
    airline: string;
    code: string;
    price: number;
    currency: string;
    cabin: string;
    baggage: string;
    outbound: {
      from: string;
        to: string;
        departure: string;
        arrival: string;
        duration: string;
        date: string;
    };
    inbound: {
      from: string;
        to: string;
        departure: string;
        arrival: string;
        duration: string;
        date: string;
    }
}}) {
  return (
              <div key={flight.id} className="group relative bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden transition-all hover:bg-white/[0.15] hover:border-white/20 shadow-2xl">
            
            <div className="p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
              
              {/* Column 1: Airline Brand */}
              <div className="flex lg:flex-col items-center gap-3 min-w-[120px]">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-900 font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                  {flight.code}
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm">{flight.airline}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{flight.cabin}</p>
                </div>
              </div>

              {/* Column 2: The Journey (Outbound & Inbound) */}
              <div className="flex-1 space-y-8">
                {/* Outbound Row */}
                <div className="flex items-center justify-between text-center md:text-left">
                  <div className="w-20">
                    <p className="text-2xl font-bold">{flight.outbound.departure}</p>
                    <p className="text-xs text-gray-400 font-medium">{flight.outbound.from}</p>
                  </div>
                  
                  <div className="flex-1 px-6 flex flex-col items-center">
                    <span className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-tighter">{flight.outbound.duration}</span>
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent relative">
                      <Plane className="w-4 h-4 absolute -top-[7px] left-1/2 -translate-x-1/2 text-[var(--brand-primary)]" />
                    </div>
                    <span className="text-[10px] text-green-400 mt-1 font-bold uppercase">Direct</span>
                  </div>

                  <div className="w-20 text-right">
                    <p className="text-2xl font-bold">{flight.outbound.arrival}</p>
                    <p className="text-xs text-gray-400 font-medium">{flight.outbound.to}</p>
                  </div>
                </div>

                {/* Inbound Row */}
                <div className="flex items-center justify-between text-center md:text-left opacity-80">
                  <div className="w-20">
                    <p className="text-2xl font-bold">{flight.inbound.departure}</p>
                    <p className="text-xs text-gray-400 font-medium">{flight.inbound.from}</p>
                  </div>
                  
                  <div className="flex-1 px-6 flex flex-col items-center">
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent relative">
                      <ArrowLeft className="w-3 h-3 absolute -top-[5px] left-1/2 -translate-x-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="w-20 text-right">
                    <p className="text-2xl font-bold">{flight.inbound.arrival}</p>
                    <p className="text-xs text-gray-400 font-medium">{flight.inbound.to}</p>
                  </div>
                </div>
              </div>

              {/* Column 3: Price & Selection */}
              <div className="lg:border-l border-white/10 lg:pl-10 flex flex-col items-center justify-center">
                <div className="mb-4 text-center">
                  <p className="text-4xl font-black text-white">
                    <span className="text-sm font-medium text-gray-400 align-top mt-1 mr-1">$</span>
                    {flight.price}
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase flex items-center justify-center gap-1 mt-1">
                    <Luggage className="w-3 h-3" /> {flight.baggage}
                  </p>
                </div>
                <button className="w-full lg:w-40 bg-[var(--brand-primary)] hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 uppercase text-xs tracking-widest">
                  View Deal
                </button>
              </div>

            </div>
          </div>
  )
}
