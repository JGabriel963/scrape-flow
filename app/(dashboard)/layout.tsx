import BreadcrumbHeader from '@/components/global/BreadcrumbHeader'
import DesktopSidebar from '@/components/global/Sidebar'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { ModeToggle } from '../../components/global/ThemeToogleMode'
import { SignedIn, UserButton } from '@clerk/nextjs'

export default function Layout({  children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
        <DesktopSidebar />
        <div className="flex flex-col flex-1 min-h-screen">
            <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>
                <BreadcrumbHeader />
                <div className='gap-1 flex items-center'>
                    <ModeToggle />
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </header>
            <Separator />
            <div className='overflow-auto'>
                <div className="flex-1 container p-4 text-accent-foreground">
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}
