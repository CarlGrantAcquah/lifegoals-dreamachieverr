export interface User {
  id: string;
  email: string;
  name: string;
  premium: boolean;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  deadline: Date;
  status: 'pending' | 'in-progress' | 'completed';
  steps: Step[];
  resources: Resource[];
  schedule: Schedule;
}

export interface Step {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  deadline: Date;
}

export interface Resource {
  id: string;
  type: 'skill' | 'tool' | 'material';
  name: string;
  acquired: boolean;
}

export interface Schedule {
  id: string;
  weeklySlots: TimeSlot[];
  preferences: {
    startTime: string;
    endTime: string;
    workDays: number[];
  };
}

export interface TimeSlot {
  id: string;
  day: number;
  startTime: string;
  endTime: string;
  taskId?: string;
}