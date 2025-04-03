
// Get all categories // 

import { NextResponse } from "next/server";
import dbConnect from '@/app/utils/dbConnect';
import { Category } from "@/app/models/Story";

export async function GET() {
    await dbConnect();
    
    try {
      const categories = await Category.find();  
      return NextResponse.json(categories); 

    } catch (error) {
      return NextResponse.json({ message: 'Failed to fetch category: ' + error }, { status: 500 });
    }
  }