import { cookies } from 'next/headers';

type SessionData = {
  userId: number;
  role: string;
};

export async function setSession(data: SessionData) {
  const sessionString = Buffer.from(JSON.stringify(data)).toString('base64');
  (await cookies()).set('auth_session', sessionString, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getSession(): Promise<SessionData | null> {
  const sessionCookie = (await cookies()).get('auth_session')?.value;
  if (!sessionCookie) return null;

  try {
    const jsonString = Buffer.from(sessionCookie, 'base64').toString('utf-8');
    return JSON.parse(jsonString) as SessionData;
  } catch (e) {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).delete('auth_session');
}
