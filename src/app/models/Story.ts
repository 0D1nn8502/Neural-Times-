import mongoose, { mongo, MongooseError } from "mongoose"; 
import { unique } from "next/dist/build/utils";

// Design Considerations // 

// SubTopics within a category, need not be unique to that category? : At this stage, we dont know what all subtopics might end up being added //   

const categorySchema = new mongoose.Schema({ 
    name: {type: String, required: true, unique: true},  
    label: { type: String, required: true, unique: true } 
});

const subtopicSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },               
    label: { type: String, required: true, unique: true },              
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}); 


subtopicSchema.index({category: 1}); 

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  l1: { type: String, required: true },
  l2: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subtopicId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubTopic', required: true } 
}); 

// Compound indexes for fast lookups by category and subtopic // 
storySchema.index({ categoryId: 1, subtopicId: 1 });


const Story = mongoose.models.Story || mongoose.model('Story', storySchema); 
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema); 
const Subtopic = mongoose.models.Subtopic || mongoose.model('Subtopic', subtopicSchema); 

export {Story, Category, Subtopic};   

