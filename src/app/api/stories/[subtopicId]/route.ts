import { NextResponse } from "next/server";
import dbConnect from '@/app/utils/dbConnect'; 
import { Story } from "@/app/models/Story"; 

export async function GET(request: Request, { params }: { params: Promise <{ subtopicId: string }> }) {
    await dbConnect();
    const { subtopicId } = await params;  

    try {
        const stories = await Story.find({ subtopicId }); // Fetch stories by subtopicId // 
        return NextResponse.json(stories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch stories: ' + error }, { status: 500 });
    }
}



