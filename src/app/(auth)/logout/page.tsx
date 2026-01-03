'use client'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { DeleteCookie } from '@/app/actions/logout-action'
import { Hand } from 'lucide-react'

export default function Logout() {

    useEffect(() => {
        const performLogout = async () => {
            await signOut({ redirect: false })
            await DeleteCookie()

            window.location.href = '/login'

        }
        performLogout()
    }, [])
    return (

        <div className="m-100 flex justify-center items-center">
            <div className='px-5 gap-3 py-4 w-fit dis rounded-full flex items-center justify-center bg-gray-muted-primary'>
                <p className='text-sm text-black-default'>Até mais, Quem é vivo sem aparece!</p> <Hand />
            </div>

        </div>
    )
}