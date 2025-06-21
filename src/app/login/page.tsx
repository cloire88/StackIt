import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, signup } from './actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function LoginPage() {
//   return (
//     
//       
//         
//         
//           <form className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email" className="sr-only">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Email"
//                 className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="sandi" className="sr-only">
//                 Sandi
//               </Label>
//               <Input
//                 id="sandi"
//                 type="password"
//                 placeholder="Sandi"
//                 className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
//               />
//             </div>
//             <Button
//               type="submit"
//               className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl mt-6 transition-colors"
//             >
//               Masuk
//             </Button>
//           </form>
//           <div className="text-center mt-6">
//             <p className="text-gray-500 text-sm">
//               Belum Punya Akun?{" "}
//               <Link href="/register" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
//                 Daftar
//               </Link>
//             </p>
//           </div>
//         
//       
//     
//   )
// }



export default function LoginPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-0">
        <CardHeader className="text-center pb-2 pt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang di StackIt</h1>
          <CardTitle className="text-xl text-gray-600 font-medium">Masuk</CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email"className="sr-only">
                Email:
              </label>
              <Input 
                id="email" 
                type="email"
                placeholder="Email" 
                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password:
              </label>
              <Input 
                id="password" 
                name="password" 
                type="password"
                placeholder="Password" 
                required 
                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
              />
            </div><a>
            <button 
              formAction={login}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl mt-6 transition-colors cursor-pointer"
              >
              Log in
            </button>
            </a>
            <button formAction={signup}>Sign up</button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
