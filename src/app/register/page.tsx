import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-0">
        <CardHeader className="text-center pb-2 pt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang di StackIt</h1>
          <CardTitle className="text-xl text-gray-600 font-medium">Daftar</CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama" className="sr-only">
                Nama
              </Label>
              <Input
                id="nama"
                type="text"
                placeholder="Nama"
                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sandi" className="sr-only">
                Sandi
              </Label>
              <Input
                id="sandi"
                type="password"
                placeholder="Sandi"
                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl mt-6 transition-colors"
            >
              Daftar
            </Button>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Sudah Punya Akun?{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
                Masuk
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
