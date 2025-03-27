
import { categories } from "@/app/types";

export default async function StoryPage({
  params,
  searchParams 
}: {
  params: {
    category: string;
    subtopic: string;
    slug: string;
  };
  searchParams: {[key: string]: string | string[] | undefined};
}) {
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
      <p>{foundStory.l1}</p>
      {/* L2 content */}
    </div>
  );
}
