import Logo from '@/components/global/Logo'
import React from 'react'

export default function Layout({ children }: {
  children: React.ReactNode}) {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
        <Logo />
        {children}
    </div>
  )
}
