import Link from "next/link";
import { Button } from "@/components/ui/button";

const BookingFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-[#B78160]">Booking Failed</h1>
      <p className="text-lg mb-8 text-gray-600">
        We're sorry, but your booking could not be completed. Please try again
        later.
      </p>
      <Button asChild className="bg-[#B78160] hover:bg-[#BE8B69] text-white">
        <Link href="/book">Return to Matched Therapists</Link>
      </Button>
    </div>
  );
};

export default BookingFailed;
