import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">MindfulMatch</Link>
            <div className="space-x-4">
              <Link href="/login" className="text-sm hover:underline">Login</Link>
              <Link href="/signup" className="text-sm hover:underline">Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to MindfulMatch</h1>
          <p className="text-xl text-muted-foreground mb-8">Your journey to better mental health starts here</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>I'm Seeking Help</CardTitle>
              <CardDescription>Find the right therapist for your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Take our quick quiz to get personalized therapist recommendations based on your preferences and needs.</p>
              <Button asChild className="w-full">
                <Link href="/quiz/customer/step1">Start Your Journey</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>I'm a Mental Health Professional</CardTitle>
              <CardDescription>Join our network of therapists</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Create your profile and connect with clients who need your expertise.</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/quiz/therapist/step1">Join as a Therapist</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Why Choose MindfulMatch?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Personalized Matching</h3>
              <p className="text-muted-foreground">Our algorithm finds the best therapist for your unique needs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Diverse Specialists</h3>
              <p className="text-muted-foreground">Access a wide range of mental health professionals.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Flexible Sessions</h3>
              <p className="text-muted-foreground">Choose between in-person, video, or chat-based therapy.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2023 MindfulMatch. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/about" className="hover:underline">About Us</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

