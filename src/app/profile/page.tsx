"use client"

import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    avatar_url: ""
  })
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile...")
        const response = await fetch("/api/profile")
        if (response.ok) {
          const { profile } = await response.json()
          console.log("Profile fetched:", profile)
          setProfile(profile)
          setFormData({
            username: profile.username || "",
            full_name: profile.full_name || "",
            avatar_url: profile.avatar_url || ""
          })
        } else {
          console.error("Failed to fetch profile")
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      console.log("Saving profile with data:", formData)
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const { profile } = await response.json()
        console.log("Profile updated:", profile)
        setProfile(profile)
        setIsEditing(false)
      } else {
        const error = await response.json()
        console.error("Failed to update profile:", error)
        alert(error.error || "Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      username: profile?.username || "",
      full_name: profile?.full_name || "",
      avatar_url: profile?.avatar_url || ""
    })
    setIsEditing(false)
  }

  const handleSettingsClick = () => {
    console.log("Settings clicked")
  }

  if (isLoading) {
    return (
      <>
        <AppHeader onSettingsClick={handleSettingsClick} />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-white/20 rounded mb-4"></div>
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-2/3"></div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <AppHeader onSettingsClick={handleSettingsClick} />

      <main className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
            <p className="text-gray-300">Manage your account settings and preferences</p>
          </div>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription className="text-gray-300">
                Update your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-white">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar_url" className="text-white">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Member Since</Label>
                <p className="text-gray-300">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleSave} 
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button 
                      onClick={handleCancel}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
} 