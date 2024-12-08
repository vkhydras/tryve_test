import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function BookingFailedPage() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Booking Failed</h1>
      <p className="mb-6">We're sorry, but there was an error processing your booking. Please try again.</p>
      <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
        <Link href="/book">
          Return to Matched Therapists
        </Link>
      </Button>
    </div>
  )
}

