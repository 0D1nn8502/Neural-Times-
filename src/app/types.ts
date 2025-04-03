

export interface Category {
  _id: string;      // Automatically created by Mongoose
  name: string;
  label: string;
}

export interface Subtopic {
  _id: string;      // Automatically created by Mongoose 
  name: string; 
  label: string;
  categoryId: string;  // Stored as a string version of ObjectId
}

export interface Story {
  _id: string;      // Automatically created by Mongoose
  title: string;
  l1: string;
  l2: string;
  slug: string;
  categoryId: string;  // Stored as a string version of ObjectId
  subtopicId: string;  // Stored as a string version of ObjectId
}

// GroupedStories interface for aggregation results on the frontend:
export interface GroupedStories {
  subtopic: Subtopic;  // The subtopic object for the group
  stories: Story[];    // Array of stories associated with that subtopic
}