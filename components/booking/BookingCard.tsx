"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type BookingCardProps = {
  booking: any;
  onCancel: (id: number) => void;
};

export default function BookingCard({
  booking,
  onCancel,
}: BookingCardProps) {

  const handleDetail = () => {
    if (booking.status === "PAID") {
      window.location.href = `/e-ticket/${booking.id}`;
    } else {
      window.location.href = `/booking/${booking.id}`;
    }
  };

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">

      <CardContent className="p-5 flex justify-between items-center">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
            ✈️
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {booking.flight.from} → {booking.flight.to}
            </h2>

            <p className="text-sm text-gray-500">
              Seats: {booking.seats}
            </p>

            <Badge className="mt-2 bg-purple-600">
              {booking.status || "Booked"}
            </Badge>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex gap-2">

          <Button
            variant="outline"
            className="border-gray-300 text-black"
            onClick={handleDetail}
          >
            Detail
          </Button>

          <Button
            variant="destructive"
            className="border-gray-300 text-black"
            onClick={() => onCancel(booking.id)}
          >
            Cancel
          </Button>

        </div>

      </CardContent>
    </Card>
  );
}