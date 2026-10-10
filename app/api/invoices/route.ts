import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM invoices WHERE status = 'PENDING_REVIEW'");
        return NextResponse.json(rows);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, new_status } = await request.json();
        await pool.query("UPDATE invoices SET status = ? WHERE id = ?", [new_status, id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Database error while updating invoice' }, { status: 500 });
    }
}