import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth, db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { Goal, Schedule } from '../types';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generatePlan = async (goal: string, schedule: Schedule) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Create a detailed plan for the following goal: ${goal}
    Consider the following schedule constraints:
    - Working hours: ${schedule.preferences.startTime} to ${schedule.preferences.endTime}
    - Working days: ${schedule.preferences.workDays.join(', ')}
    
    Please provide:
    1. Breakdown of steps
    2. Estimated timeline
    3. Required resources
    4. Recommended time slots`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const saveGoal = async (goal: Partial<Goal>) => {
  if (!auth.currentUser) throw new Error('User not authenticated');
  
  const goalsRef = collection(db, 'goals');
  return addDoc(goalsRef, {
    ...goal,
    userId: auth.currentUser.uid,
    createdAt: new Date(),
    status: 'pending'
  });
};

export const getUserGoals = async () => {
  if (!auth.currentUser) throw new Error('User not authenticated');
  
  const goalsRef = collection(db, 'goals');
  const q = query(goalsRef, where('userId', '==', auth.currentUser.uid));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Goal[];
};