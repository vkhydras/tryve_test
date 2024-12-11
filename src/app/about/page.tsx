import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-[#FFF5E6]">
      <h1 className="text-4xl font-bold text-[#2C1D14] mb-8 text-center">
        About Tryve
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border-[#DCAB90]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-[#2C1D14] mb-4">
              Our Mission
            </h2>
            <p className="text-[#2C1D14] leading-relaxed mb-4">
              At Tryve, we believe that mental health care should be accessible,
              personalized, and effective. Our mission is to connect individuals
              with the right mental health professionals who can provide the
              support and guidance they need on their journey to better mental
              well-being.
            </p>
            <p className="text-[#2C1D14] leading-relaxed">
              We understand that finding the right therapist is a deeply
              personal journey. That's why we've developed a sophisticated
              matching system that considers various factors including
              specialties, approach, and personal preferences to ensure the best
              possible therapeutic relationship.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#DCAB90]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-[#2C1D14] mb-4">
              Our Approach
            </h2>
            <div className="grid gap-6">
              <div>
                <h3 className="text-xl font-medium text-[#2C1D14] mb-2">
                  Personalized Matching
                </h3>
                <p className="text-[#2C1D14]">
                  Our intelligent matching system takes into account your unique
                  needs, preferences, and goals to connect you with therapists
                  who are best suited to help you.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#2C1D14] mb-2">
                  Quality Care
                </h3>
                <p className="text-[#2C1D14]">
                  We partner with licensed, experienced mental health
                  professionals who are committed to providing high-quality care
                  and support.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#2C1D14] mb-2">
                  Accessibility
                </h3>
                <p className="text-[#2C1D14]">
                  We offer flexible scheduling options and both in-person and
                  online therapy sessions to make mental health care more
                  accessible.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#DCAB90]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-[#2C1D14] mb-4">
              Our Team
            </h2>
            <p className="text-[#2C1D14] leading-relaxed">
              Tryve was founded by a team of mental health professionals,
              technologists, and individuals who have experienced the challenges
              of finding the right therapeutic support. We're committed to
              improving access to mental health care and making the journey to
              better mental well-being smoother and more effective.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
