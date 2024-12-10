import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Brain,
  Users,
  Sparkles,
  ArrowRight,
  Heart,
} from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 to-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-teal-100/25 [mask-image:radial-gradient(ellipse_at_center,white_50%,transparent_100%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 tracking-tight">
              Begin Your Journey to
              <span className="block text-teal-600 mt-2">
                Better Mental Health
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Take the first step towards a happier, healthier you. Our
              personalized approach connects you with the right therapist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105"
              >
                <Link href="/questionaire">
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-teal-200 hover:bg-teal-50 text-teal-700 px-8 py-6 text-lg rounded-full"
              >
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Your Path to Mental Wellness
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Quick Assessment",
                description:
                  "Complete our intelligent questionnaire designed to understand your unique needs and preferences.",
              },
              {
                icon: Sparkles,
                title: "Smart Matching",
                description:
                  "Our advanced algorithm connects you with therapists who align with your specific requirements.",
              },
              {
                icon: Heart,
                title: "Begin Healing",
                description:
                  "Start your therapeutic journey with a trusted professional who understands your goals.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl border border-teal-100 hover:border-teal-200"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-teal-100 to-teal-50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity -z-10" />
                <feature.icon className="h-12 w-12 text-teal-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-lg mb-8 text-teal-50">
              Join thousands who have found their path to mental wellness
              through Tryve.
            </p>
            <Button
              asChild
              className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-6 text-lg rounded-full"
            >
              <Link href="/questionaire">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Tryve</h3>
              <p className="text-gray-400">
                Making mental health care accessible and personalized for
                everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block text-gray-400 hover:text-teal-300"
                >
                  About Us
                </Link>
                <Link
                  href="/how-it-works"
                  className="block text-gray-400 hover:text-teal-300"
                >
                  How It Works
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-400 hover:text-teal-300"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <div className="space-y-2">
                <Link
                  href="/blog"
                  className="block text-gray-400 hover:text-teal-300"
                >
                  Blog
                </Link>
                <Link
                  href="/faq"
                  className="block text-gray-400 hover:text-teal-300"
                >
                  FAQ
                </Link>
                <Link
                  href="/testimonials"
                  className="block text-gray-400 hover:text-teal-300"
                >
                  Testimonials
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <div className="space-y-2">
                <Link
                  href="/privacy"
                  className="block text-gray-400 hover:text-teal-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="block text-gray-400 hover:text-teal-300"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Tryve. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
