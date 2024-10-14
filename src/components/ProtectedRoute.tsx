"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export function withAuth(WrappedComponent: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter()

    useEffect(() => {
      const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/login')
        }
      }
      checkUser()
    }, [])

    return <WrappedComponent {...props} />
  }
}