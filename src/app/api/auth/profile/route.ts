import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const API_URL = process.env.BACKEND_URL!;
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('font-easy-auth');

    if (!authCookie) {
        return NextResponse.json(
            { error: 'Não autenticado' },
            { status: 401 }
        );
    }

    try {
        const res = await fetch(`${API_URL}/profile`, {
            headers: {
                'Cookie': `font-easy-auth=${authCookie.value}`,
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Erro ao buscar perfil' },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro no proxy de profile:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
