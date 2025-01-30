import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api';

export const useGetCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      axiosInstance.get(`/people/${id}`).then((data) => console.log(data)),

    onSuccess: (newCharacter) => {
      console.log(newCharacter);
      queryClient.setQueryData(['character'], newCharacter);
    },
  });
};
