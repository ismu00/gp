import mongoose from 'mongoose';
import { connectionStr2 } from '@/app/lib/db';
import AreasSchema from '@/app/lib/areaModel'; // ✅ default import
import { NextResponse } from 'next/server';


export async function DELETE(request, { params }) {
  const id = params.id;

  try {
    await mongoose.connect(connectionStr2);

    const result = await AreasSchema.findByIdAndDelete(id);

    if (!result) {
      return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting', error }), { status: 500 });
  }
}
