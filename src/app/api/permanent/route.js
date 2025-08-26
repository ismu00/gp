import mongoose from 'mongoose';
import { connectionStr2 } from '@/app/lib/db';
import permanent from '@/app/lib/permanentModel';
import { NextResponse } from 'next/server';

// GET - Fetch all permanent areas
export async function GET() {
    try {
        await mongoose.connect(connectionStr2);
        const permanentList = await permanent.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, result: permanentList });
    } catch (error) {
        console.error('Error fetching permanent areas:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to fetch permanent areas' 
        }, { status: 500 });
    }
}

// POST - Add new permanent area(s)
export async function POST(request) {
    try {
        await mongoose.connect(connectionStr2);
        const data = await request.json();
        
        if (!Array.isArray(data) || data.length === 0) {
            return NextResponse.json({ 
                success: false, 
                error: 'Invalid data format. Expected array of areas.' 
            }, { status: 400 });
        }

        // Validate each area
        for (const area of data) {
            if (!area.place || !area.category || !area.level || !area.cleaner || area.cleaner.length === 0) {
                return NextResponse.json({ 
                    success: false, 
                    error: 'Missing required fields: place, category, level, and at least one cleaner are required.' 
                }, { status: 400 });
            }
        }

        const result = await permanent.insertMany(data);
        return NextResponse.json({ 
            success: true, 
            result: result,
            message: `${result.length} area(s) added successfully` 
        });

    } catch (error) {
        console.error('Error adding permanent areas:', error);
        if (error.code === 11000) {
            return NextResponse.json({ 
                success: false, 
                error: 'Area already exists in this category' 
            }, { status: 409 });
        }
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to add permanent areas' 
        }, { status: 500 });
    }
}