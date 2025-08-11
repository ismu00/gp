import { NextResponse } from 'next/server'
import Task from '@/app/lib/taskListModel'
import mongoose from 'mongoose'
import { connectionStr2 } from '@/app/lib/db'

export async function GET(req, { params }) {
  const { id } = await params

  try {
    await mongoose.connect(connectionStr2)

    const task = await Task.findById(id)

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, result: task })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
