import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-teal-50">
      <main className="flex-grow container mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-teal-600">TryveTest</span>
          </h1>
          <p className="text-lg text-gray-600">
            Empowering your mental health journey with precision and care.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-10">
          <Card className="shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition">
            <CardHeader>
              <CardTitle className="text-teal-700">I'm Seeking Help</CardTitle>
              <CardDescription>
                Discover the best therapist for your needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600">
                Take a quick quiz to get personalized therapist recommendations
                tailored to your preferences.
              </p>
              <Button
                asChild
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Link href="signup">Start Your Journey</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition">
            <CardHeader>
              <CardTitle className="text-teal-700">
                I'm a Mental Health Professional
              </CardTitle>
              <CardDescription>
                Join our network and connect with clients.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-gray-600">
                Create a profile to reach clients who value your expertise.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-teal-600 text-teal-600 hover:bg-teal-50"
              >
                <Link href="practitioner_signup">Join as a Therapist</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Why Choose TryveTest?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 border">
              <h3 className="font-semibold text-teal-700 mb-2">
                Personalized Care
              </h3>
              <p className="text-gray-600">
                Our advanced algorithm matches you with the right therapist.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 border">
              <h3 className="font-semibold text-teal-700 mb-2">
                Diverse Specialists
              </h3>
              <p className="text-gray-600">
                Access a variety of skilled mental health professionals.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 border">
              <h3 className="font-semibold text-teal-700 mb-2">
                Flexible Sessions
              </h3>
              <p className="text-gray-600">
                Choose sessions that fit your schedule and preferences.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2023 TryveTest. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/about" className="hover:underline text-sm">
              About Us
            </Link>
            <Link href="/privacy" className="hover:underline text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
