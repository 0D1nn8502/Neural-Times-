import { NextResponse } from "next/server";
import dbConnect from '@/app/utils/dbConnect'; 
import { Story } from "@/app/models/Story"; 

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { categoryId, subtopicId, title, l1, l2, slug } = await request.json();
        const newStory = new Story({ categoryId, subtopicId, title, l1, l2, slug });
        await newStory.save();
        return NextResponse.json({ message: 'Story added successfully!', story: newStory }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add story: ' + error }, { status: 500 });
    }
}
