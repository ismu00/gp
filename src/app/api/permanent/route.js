import mongoose from 'mongoose';
import { connectionStr2 } from '@/app/lib/db';
import Task from '@/app/lib/taskListModel';
import { NextResponse } from 'next/server';



export async function GET() {

    await mongoose.connect(connectionStr2);
    const Tasks = await Task.find();
    return NextResponse.json({ success: true, result: Tasks });

}


export async function POST(request) {
  try {
    await mongoose.connect(connectionStr2);
    const body = await request.json();

    const newTask = new Task(body);
    const saved = await newTask.save();

    return new Response(JSON.stringify({ success: true, result: saved }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
