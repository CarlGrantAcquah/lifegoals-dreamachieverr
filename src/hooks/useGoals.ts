import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserGoals, saveGoal } from '../services/api';
import { Goal } from '../types';

export function useGoals() {
  const queryClient = useQueryClient();

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: getUserGoals
  });

  const { mutate: addGoal } = useMutation({
    mutationFn: (newGoal: Partial<Goal>) => saveGoal(newGoal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    }
  });

  return {
    goals,
    isLoading,
    addGoal
  };
}