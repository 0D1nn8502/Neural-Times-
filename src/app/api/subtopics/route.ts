import { NextResponse } from "next/server";
import dbConnect from '@/app/utils/dbConnect'; 
import { Subtopic } from "@/app/models/Story"; 

export async function GET(request: Request) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    try {
        const subtopics = await Subtopic.find({ categoryId });
        return NextResponse.json(subtopics);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch subtopics: ' + error }, { status: 500 });
    }
}
