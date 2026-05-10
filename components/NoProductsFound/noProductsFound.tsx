"use client"

import { MapPin, Package } from "lucide-react"
import useProductsByLocationStore from "@/store/productsByLocationStore"

export function NoProductsFound() {
  const { setIsOpen } = useProductsByLocationStore()

  return (
    <div className="flex items-center justify-center p-2 w-full">
      <div className="rounded-2xl p-2 sm:p-10  w-full flex flex-col items-center 
      text-center bg-linear-to-br from-primary via-[#2540C4] to-primary
       space-y-5">

        {/* Icon ring */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setIsOpen(true)
            }
          }}
          className="relative mb-6 cursor-pointer"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white/10 border border-white/20">
            <Package className="w-9 h-9 text-white/90" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center bg-[#F5C842] border-2 border-white/30">
            <MapPin className="w-4 h-4 text-[#1E3AB8]" strokeWidth={2} />
          </div>
          
        </div>

        {/* Message */}
        <p className="text-white/95 font-medium leading-relaxed text-xl  sm:text-4xl tracking-wide">
          No se encontraron productos disponibles en la <samp className="text-accent font-sans font-bold">provincia</samp>  seleccionada.
        </p>

        {/* Divider */}
        <div className="my-5 h-1 w-20 rounded-full bg-accent" />

        <p
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setIsOpen(true)
            }
          }}
          className="text-white/50 text-sm sm:text-2xl tracking-wide cursor-pointer"
        >
          Intenta con otra provincia
        </p>

      </div>
    </div>
  )
}