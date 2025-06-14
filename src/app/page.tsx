
// (Server Component) // 

import HomePage from './components/HomePage'; 
import { fetchCategoriesServer } from './lib/storyFetching'; 
import { Category } from './types';

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
