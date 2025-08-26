// /api/students/update-permanent-status/route.js
import mongoose from 'mongoose';
import { connectionStr2 } from '@/app/lib/db';
import Student from '@/app/lib/studentsModel'; // Adjust the import path as needed
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        await mongoose.connect(connectionStr2);
        const { studentNames, permanentCleaner } = await request.json();
        
        // Validate input
        if (!Array.isArray(studentNames) || studentNames.length === 0) {
            return NextResponse.json({ 
                success: false, 
                error: 'Student names array is required and cannot be empty' 
            }, { status: 400 });
        }

        if (typeof permanentCleaner !== 'boolean') {
            return NextResponse.json({ 
                success: false, 
                error: 'permanentCleaner must be a boolean value' 
            }, { status: 400 });
        }

        // Update all students with the given names
        const updateResult = await Student.updateMany(
            { name: { $in: studentNames } },
            { 
                $set: { 
                    permanentCleaner: permanentCleaner,
                    updatedAt: new Date()
                } 
            }
        );

        // Check if any students were found and updated
        if (updateResult.matchedCount === 0) {
            return NextResponse.json({ 
                success: false, 
                error: 'No students found with the provided names' 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: `Updated ${updateResult.modifiedCount} student(s) permanent cleaner status`,
            matchedCount: updateResult.matchedCount,
            modifiedCount: updateResult.modifiedCount
        });

    } catch (error) {
        console.error('Error updating student permanent status:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to update student permanent status' 
        }, { status: 500 });
    }
}

// Optional: GET method to check current permanent cleaner status
export async function GET(request) {
    try {
        await mongoose.connect(connectionStr2);
        const { searchParams } = new URL(request.url);
        const studentNames = searchParams.get('names')?.split(',') || [];
        
        if (studentNames.length === 0) {
            return NextResponse.json({ 
                success: false, 
                error: 'Student names parameter is required' 
            }, { status: 400 });
        }

        const students = await Student.find(
            { name: { $in: studentNames } },
            { name: 1, permanentCleaner: 1, _id: 1 }
        );

        return NextResponse.json({ 
            success: true, 
            result: students 
        });

    } catch (error) {
        console.error('Error fetching student permanent status:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to fetch student permanent status' 
        }, { status: 500 });
    }
}