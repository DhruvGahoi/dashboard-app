"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export function withAuth(WrappedComponent: React.ComponentType) {
  return function ProtectedRoute(props: Record<string, unknown>) {
    const router = useRouter()

    useEffect(() => {
      const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/login')
        }
      }
      checkUser()
    }, [router])

    return <WrappedComponent {...props} />
  }
}
