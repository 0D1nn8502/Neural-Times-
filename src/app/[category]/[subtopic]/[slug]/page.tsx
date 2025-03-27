
import { categories } from "@/app/types";

type Params = Promise <{slug: string, category: string, subtopic: string}>; 

export default async function StoryPage({
  params
}: {
  params: Params 
}) {

  try {

  const resolvedParams = await Promise.resolve(params);
  const { category, subtopic, slug } = resolvedParams; 

  // Find matching story data from our 'categories' array 
  const foundCategory = categories.find((cat) => cat.id === category);
  const foundSubTopic = foundCategory?.subtopics.find((st) => st.id === subtopic);
  const foundStory = foundSubTopic?.stories.find((s) => s.slug === slug);

  if (!foundCategory || !foundSubTopic || !foundStory) {
    return <h1>Story not found</h1>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{foundStory.title}</h1>
      <p>{foundStory.l2}</p> 
    </div>
  );
    
  } catch (error) {
    console.error("Internal error"); 
  }
  
}
