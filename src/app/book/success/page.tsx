"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-[#2C1D14]">
        Booking Successful!
      </h1>
      <p className="text-lg mb-8">
        Your appointment has been successfully booked.
      </p>
      <Button
        onClick={() => router.push("/appointments")}
        className="bg-[#B78160] hover:bg-[#BE8B69] text-white"
      >
        View My Appointments
      </Button>
    </div>
  );
};

export default SuccessPage;
