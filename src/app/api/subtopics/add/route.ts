import { NextResponse } from "next/server";
import dbConnect from '@/app/utils/dbConnect'; 
import { Subtopic } from "@/app/models/Story"; 

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, label, categoryId } = await request.json();
        const newSubtopic = new Subtopic({ name, label, categoryId });
        await newSubtopic.save();
        return NextResponse.json({ message: 'Subtopic added successfully!', subtopic: newSubtopic }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add subtopic: ' + error }, { status: 500 });
    }
}
