"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

export default function ProfileSettings() {
  const router = useRouter();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    console.log("Saving changes:", { name, email });
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleLogout = () => {
    // Here you would typically handle the logout logic
    console.log("Logging out");
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-col items-center">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            {isEditing ? (
              <Input
                value={name}
                onChange={handleNameChange}
                className="max-w-xs mx-auto"
              />
            ) : (
              <h2 className="text-2xl font-bold text-center">{name}</h2>
            )}
            <p className="text-gray-500 text-center">{email}</p>
          </div>

          {isEditing && hasChanges && (
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          )}

          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="w-full">
              Edit Profile
            </Button>
          )}

          <div className="space-y-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/settings/change-email">Change Email</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/settings/change-password">
                Change Password
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/settings/view-answers">edit Answers</Link>
            </Button>
          </div>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
