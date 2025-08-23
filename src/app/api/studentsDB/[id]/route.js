// app/api/students/[id]/route.js
import mongoose from 'mongoose';
import { connectionStr2 } from '@/app/lib/db';
import StudentsSchema from '@/app/lib/studentsModel';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  const id = await params.id;

  try {
    await mongoose.connect(connectionStr2);

    const result = await StudentsSchema.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { success: false, message: 'Student not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Student deleted successfully' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting student', error: error.message }, 
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const id = await params.id;

  try {
    await mongoose.connect(connectionStr2);

    const body = await request.json();
    const { name, room, className } = body;

    // Validate required fields
    if (!name || !className) {
      return NextResponse.json(
        { success: false, error: 'All fields (name, room, className) are required' }, 
        { status: 400 }
      );
    }

    // Find and update the student
    const updatedStudent = await StudentsSchema.findByIdAndUpdate(
      id,
      { 
        name: name.trim(),
        room: room,
        className: className.trim()
      },
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validators
      }
    );

    if (!updatedStudent) {
      return NextResponse.json(
        { success: false, error: 'Student not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Student updated successfully',
        result: updatedStudent 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating student:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.message }, 
        { status: 400 }
      );
    }
    
    // Handle cast errors (invalid ObjectId)
    if (error.name === 'CastError') {
      return NextResponse.json(
        { success: false, error: 'Invalid student ID' }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}