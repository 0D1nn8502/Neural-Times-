import { NextResponse } from "next/server";
import dbConnect from '@/app/utils/dbConnect'; 
import { Category } from "@/app/models/Story"; 

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, label } = await request.json();
        const newCategory = new Category({ name, label });
        await newCategory.save();
        return NextResponse.json({ message: 'Category added successfully!', category: newCategory }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add category: ' + error }, { status: 500 });
    }
}
