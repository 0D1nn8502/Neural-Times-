import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json(
      { error: 'Category parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Construct the path to the plots directory
    const plotsDir = path.join(process.cwd(), 'public', 'plots', category);

    // Check if directory exists
    if (!fs.existsSync(plotsDir)) {
      return NextResponse.json({ plots: [] });
    }

    // Read all files from the directory
    const files = fs.readdirSync(plotsDir);

    // Filter for image files and create plot objects
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
    const plots = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map(file => ({
        name: path.parse(file).name.replace(/_/g, ' ').replace(/-/g, ' '),
        path: `/plots/${category}/${file}`
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ plots });
  } catch (error) {
    console.error('Error reading plots directory:', error);
    return NextResponse.json(
      { error: 'Failed to read plots directory' },
      { status: 500 }
    );
  }
}