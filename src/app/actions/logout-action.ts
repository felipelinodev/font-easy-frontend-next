'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function DeleteCookie() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete('font-easy-auth')
    } catch (error) {
        console.log('Erro ao fazer logout')
    }
    redirect('/login')
}
