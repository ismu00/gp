import mongoose from 'mongoose';
import { connectionStr2 } from '@/app/lib/db';
import AreasSchema from '@/app/lib/areaModel'; // ✅ default import
import { NextResponse } from 'next/server';

export async function GET() {

    await mongoose.connect(connectionStr2);
    const students = await AreasSchema.find();
    return NextResponse.json({ success: true, result: students });
}


export async function POST(req) {
    await mongoose.connect(connectionStr2);
    const payload = await req.json(); // Expecting array

    if (!Array.isArray(payload)) {
        return NextResponse.json({
            success: false,
            error: "Invalid payload. Expected array.",
        }, { status: 400 });
    }

    const inserted = await StudentsSchema.insertMany(payload);
    return NextResponse.json({
        success: true,
        result: inserted
    });
}
