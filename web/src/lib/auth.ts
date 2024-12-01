import { cookies } from 'next/headers';
import { jwtDecode } from "jwt-decode";



interface User {
    sub: string;
    name: string;
}

export async function getUser(): Promise<User> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('Unauthenticated.');
    }

    try {
        const user: User = jwtDecode(token);
        return user;
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        throw new Error('Token inválido.');
    }
}
