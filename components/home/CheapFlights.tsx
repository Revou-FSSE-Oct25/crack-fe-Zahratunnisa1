"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const flights = [
  {
    route: "Jakarta → Surabaya",
    price: "Rp 500K",
    image: "/images/surabaya.jpg",
  },
  {
    route: "Jakarta → Balikpapan",
    price: "Rp 800K",
    image: "/images/balikpapan.jpg",
  },
  {
    route: "Jakarta → Bali",
    price: "Rp 1000K",
    image: "/images/bali.jpg",
  },
  {
    route: "Jakarta → Lombok",
    price: "Rp 1200K",
    image: "/images/lombok.jpg",
  },
];

export default function CheapFlights() {
  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-xl font-bold mb-4 text-purple-600">
        💸 Cheap Flights
      </h2>

      <Carousel>
        <CarouselContent>
          {flights.map((item, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="relative rounded-xl overflow-hidden shadow cursor-pointer hover:scale-105 transition">
                
                {/* IMAGE */}
                <img
                  src={item.image}
                  className="w-full h-48 object-cover"
                />

                {/* OVERLAY GELAP */}
                <div className="absolute inset-0 bg-black/40" />

                {/* TEXT */}
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-semibold text-lg">
                    {item.route}
                  </p>
                  <p className="text-sm">
                    Start from {item.price}
                  </p>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

