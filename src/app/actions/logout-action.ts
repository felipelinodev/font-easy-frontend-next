'use server'

import { cookies } from 'next/headers'

export async function DeleteCookie() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete('font-easy-auth')
    } catch (error) {
        console.log('Erro ao fazer logout')
    }
}
