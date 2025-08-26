import mongoose from 'mongoose';
import { connectionStr2 } from '@/app/lib/db';
import permanent from '@/app/lib/permanentModel';
import { NextResponse } from 'next/server';



// PUT - Update permanent area by ID
export async function PUT(request, { params }) {
    try {
        await mongoose.connect(connectionStr2);
        const { id } = params;
        const updateData = await request.json();
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ 
                success: false, 
                error: 'Invalid ID format' 
            }, { status: 400 });
        }

        // Validate required fields
        if (!updateData.place || !updateData.category || !updateData.level || !updateData.cleaner || updateData.cleaner.length === 0) {
            return NextResponse.json({ 
                success: false, 
                error: 'Missing required fields: place, category, level, and at least one cleaner are required.' 
            }, { status: 400 });
        }

        const updatedArea = await permanent.findByIdAndUpdate(
            id, 
            {
                ...updateData,
                updatedAt: new Date()
            }, 
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!updatedArea) {
            return NextResponse.json({ 
                success: false, 
                error: 'Area not found' 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            result: updatedArea,
            message: 'Area updated successfully' 
        });

    } catch (error) {
        console.error('Error updating permanent area:', error);
        if (error.code === 11000) {
            return NextResponse.json({ 
                success: false, 
                error: 'Area already exists in this category' 
            }, { status: 409 });
        }
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to update permanent area' 
        }, { status: 500 });
    }
}

// DELETE - Delete permanent area by ID
export async function DELETE(request, { params }) {
    try {
        await mongoose.connect(connectionStr2);
        const { id } =  await params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ 
                success: false, 
                error: 'Invalid ID format' 
            }, { status: 400 });
        }

        const deletedArea = await permanent.findByIdAndDelete(id);
        
        if (!deletedArea) {
            return NextResponse.json({ 
                success: false, 
                error: 'Area not found' 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            result: deletedArea,
            message: 'Area deleted successfully' 
        });

    } catch (error) {
        console.error('Error deleting permanent area:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to delete permanent area' 
        }, { status: 500 });
    }
}

// PATCH - Partially update permanent area by ID
export async function PATCH(request, { params }) {
    try {
        await mongoose.connect(connectionStr2);
        const { id } = params;
        const updateData = await request.json();
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ 
                success: false, 
                error: 'Invalid ID format' 
            }, { status: 400 });
        }

        const updatedArea = await permanent.findByIdAndUpdate(
            id, 
            {
                ...updateData,
                updatedAt: new Date()
            }, 
            { 
                new: true, 
                runValidators: true 
            }
        );

        if (!updatedArea) {
            return NextResponse.json({ 
                success: false, 
                error: 'Area not found' 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            result: updatedArea,
            message: 'Area updated successfully' 
        });

    } catch (error) {
        console.error('Error partially updating permanent area:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to update permanent area' 
        }, { status: 500 });
    }
}