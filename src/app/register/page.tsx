"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { register } from "./actions"

interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { register: registerField, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterFormData>()
  
  const password = watch("password")
  
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      
      await register(formData)
    } catch (error) {
      console.error('Registration error:', error)
    }
  }
  
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-0">
        <CardHeader className="text-center pb-2 pt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang di StackIt</h1>
          <CardTitle className="text-xl text-gray-600 font-medium">Daftar</CardTitle>
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
                {...registerField('email', { 
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
                {...registerField('password', { 
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
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password:
              </label>
              <Input 
                id="confirmPassword" 
                type="password"
                placeholder="Confirm Password" 
                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
                {...registerField('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl mt-6 transition-colors"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
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
