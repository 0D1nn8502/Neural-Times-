// Fetching functions! // 

import { Category, Subtopic, Story } from "@/app/types";


// Helper function to get the base URL for client-side fetching
function getBaseUrl() {
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8080';
    }
    return '';
}


// Client-side fetching functions (for browser use)
export async function fetchCategories(): Promise<Category[]> {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/category`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
}


export async function fetchSubtopics(categoryId : string): Promise<Subtopic[]> {
    const response = await fetch(`/api/subtopics?categoryId=${categoryId}`);  
    if (!response.ok) throw new Error('Failed to fetch subtopics'); 
    return response.json();  
} 


export async function fetchStories(subtopicId: string): Promise<Story[]> {
  const response = await fetch(`/api/stories/${subtopicId}`);
  if (!response.ok) throw new Error('Failed to fetch stories');
  return response.json();
}




// Server-side fetching functions (for SSG) // 
// bypassing the API layer // 

export async function fetchCategoriesServer(): Promise<Category[]> {
    try {
      // Import your database utilities and models
      const dbConnect = (await import('@/app/utils/dbConnect')).default;
      const { Category: CategoryModel } = await import('@/app/models/Story');
      
      // Connect to database
      const connection = await dbConnect();
      
      if (!connection?.success) {
        throw new Error('Database connection failed');
      }
      
      // Fetch categories directly from database
      const categories = await CategoryModel.find().lean() as unknown as Array<{
        _id: any;
        name: string;
        [key: string]: any;
      }>; // Explicitly cast to unknown first, then to the desired type
      
      // Convert MongoDB ObjectIds to strings for serialization
      return categories.map((category): Category => ({
        _id: category._id.toString(),  
        name: category.name,
        label: category.label 
      }));
      
    } catch (error) {
      console.error('Error fetching categories on server:', error);
      // Fallback to HTTP if database call fails
      try {

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/category`);
        if (!response.ok) throw new Error('Failed to fetch categories via HTTP');

        return response.json();
      } catch (httpError) {
        console.error('HTTP fallback also failed:', httpError);
        throw new Error('Failed to fetch categories from both database and API');
      }
    }
}