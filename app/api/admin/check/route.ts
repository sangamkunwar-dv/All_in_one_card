import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verify token format (should be a hashed version of admin password)
    const adminPassword = process.env.ADMIN_PASSWORD;
    const expectedToken = crypto
      .createHash('sha256')
      .update(adminPassword!)
      .digest('hex');

    if (token === expectedToken) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ error: 'Auth check failed' }, { status: 500 });
  }
}
