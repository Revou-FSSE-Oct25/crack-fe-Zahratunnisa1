"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const destinations = [
  {
    title: "Jakarta → Singapore",
    image: "/images/singapura.jpg",
  },
  {
    title: "Jakarta → Kuala Lumpur",
    image: "/images/kuala-lumpur.avif",
  },

  {
    title: "Jakarta → Tokyo",
    image: "/images/tokyo.jpg",
  },

  {
    title: "Jakarta → Melbourne",
    image: "/images/melbourne.jpg",
  },
];

export default function DestinationCarousel() {
  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-xl font-bold mb-4 text-purple-600">
        ✨ Popular Destinations
      </h2>

      <Carousel>
        <CarouselContent>
          {destinations.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="rounded-xl overflow-hidden shadow hover:scale-105 transition cursor-pointer">
                <img
                  src={item.image}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 bg-white">
                  <p className="font-semibold">{item.title}</p>
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
