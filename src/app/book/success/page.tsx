"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function BookingSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Here you could make an API call to your backend to confirm the booking
  }, [])

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-teal-800">Booking Successful!</h1>
      <p className="mb-6">Your therapy session has been booked and confirmed.</p>
      <Button 
        onClick={() => router.push('/appointments')}
        className="bg-teal-600 hover:bg-teal-700 text-white"
      >
        View My Appointments
      </Button>
    </div>
  )
}

