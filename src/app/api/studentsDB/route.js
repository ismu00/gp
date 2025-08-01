// app/api/students/route.js
import mongoose from 'mongoose';
import { connectionStr2 } from '@/app/lib/db';
import StudentsSchema from '@/app/lib/studentsModel'; // ✅ default import
import { NextResponse } from 'next/server';

export async function GET() {

    await mongoose.connect(connectionStr2);
    const students = await StudentsSchema.find();
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
