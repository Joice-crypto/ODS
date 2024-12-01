import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    //console.log(token)

    if (!token) {

        return NextResponse.redirect('http://localhost:3000/', {
            headers: {
                'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=60;`,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/usuario/:path*'],
};
