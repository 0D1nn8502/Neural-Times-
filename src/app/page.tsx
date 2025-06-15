
// (Server Component) : For static site generation // 

import HomePage from './components/HomePage'; 
import { fetchCategoriesServer } from './lib/storyFetching'; 
import { Category } from './types';


export const metadata = {
  title: 'Your Page Title',
  description: 'Page description',
} 

export default async function Page() {
  let initialCategories : Category[] = []; 
  let categoriesError = undefined;

  try {
    initialCategories = await fetchCategoriesServer();
  } catch (error) {
    console.error('Failed to prefetch categories:', error);
    categoriesError = 'Failed to load categories';
  }

  return (
    <HomePage 
      initialCategories={initialCategories}
      categoriesError={categoriesError}
    />
  );
}
