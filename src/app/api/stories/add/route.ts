import { NextResponse } from "next/server";
import dbConnect from '@/app/utils/dbConnect'; 
import { Story } from "@/app/models/Story";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { categoryId, subtopicId, title, l1, l2, slug, numeric } = await request.json();
        
        // Ensure numeric is an array or default to an empty array
        const parsedNumeric = Array.isArray(numeric) ? numeric : []; 

        const newStory = new Story({ categoryId, subtopicId, title, l1, l2, slug, parsedNumeric }); 
        
        await newStory.save();
        return NextResponse.json({ message: 'Story added successfully!', story: newStory }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add story: ' + error }, { status: 500 });
    }
}
