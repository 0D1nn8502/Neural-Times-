
import { NextResponse } from "next/server";
import dbConnect from '@/app/utils/dbConnect';
import { Category } from "@/app/models/Story";


export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  await dbConnect();
  
  try { 

    const arrivedparams = await params; 
    const category = await Category.findById(arrivedparams.categoryId);

    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category);
    
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch category: ' + error }, { status: 500 });
  }
}
