import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      category: "Mental Health Information",
      items: [
        {
          title: "National Institute of Mental Health",
          description: "Science-based information on mental health conditions",
          link: "https://www.nimh.nih.gov",
        },
        {
          title: "Mental Health America",
          description: "Mental health resources and online screening tools",
          link: "https://www.mhanational.org",
        },
      ],
    },
    {
      category: "Self-Help Tools",
      items: [
        {
          title: "Mindfulness Exercises",
          description: "Free mindfulness meditation resources",
          link: "https://www.mindful.org",
        },
        {
          title: "Anxiety and Depression Association of America",
          description: "Self-help strategies and support groups",
          link: "https://adaa.org",
        },
      ],
    },
    {
      category: "Educational Resources",
      items: [
        {
          title: "Psychology Today",
          description: "Articles and resources on mental health topics",
          link: "https://www.psychologytoday.com",
        },
        {
          title: "Mental Health First Aid",
          description: "Training to help others in crisis",
          link: "https://www.mentalhealthfirstaid.org",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-[#FFF5E6]">
      <h1 className="text-4xl font-bold text-[#2C1D14] mb-8 text-center">
        Mental Health Resources
      </h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {resources.map((category) => (
          <Card key={category.category} className="border-[#DCAB90]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#2C1D14]">
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {category.items.map((item) => (
                <div key={item.title} className="p-4 rounded-lg bg-white">
                  <h3 className="text-xl font-semibold text-[#2C1D14] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#2C1D14] mb-3">{item.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="text-[#B78160] border-[#B78160]"
                  >
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
