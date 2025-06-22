"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login, signup } from './actions'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface LoginFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>()
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      
      await login(formData)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleSignup = async (data: LoginFormData) => {
    try {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      
      await signup(formData)
    } catch (error) {
      console.error('Signup error:', error)
    }
  }
  
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-0">
        <CardHeader className="text-center pb-2 pt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang di StackIt</h1>
          <CardTitle className="text-xl text-gray-600 font-medium">Masuk</CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="sr-only">
                Email:
              </label>
              <Input 
                id="email" 
                type="email"
                placeholder="Email" 
                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="sr-only">
                Password:
              </label>
              <Input 
                id="password" 
                type="password"
                placeholder="Password" 
                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl mt-6 transition-colors"
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </Button>
            
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Belum Punya Akun?{" "}
              <Link href="/register" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
                Daftar
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
