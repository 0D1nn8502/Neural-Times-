
// Get all categories // 

import { NextResponse } from "next/server";
import dbConnect from '@/app/utils/dbConnect';
import { Category } from "@/app/models/Story";

export async function GET() {
    const connection = await dbConnect();
  
    if (!connection?.success) {
      return NextResponse.json({message: connection?.error}, {status: 500}); 
    }  
  
    try {
      const categories = await Category.find();  
      return NextResponse.json(categories); 

    } catch (error) {
      return NextResponse.json({ message: 'Failed to fetch category: ' + error }, { status: 500 });
    }
  }