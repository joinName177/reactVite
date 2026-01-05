// hooks/useMessages.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { messageApi, SendMessageParams } from '@/api/message'

export const useMessages = (roomId: string) => {
  return useQuery({
    queryKey: ['messages', roomId],
    queryFn: () => messageApi.getMessages({ roomId }),
    staleTime: 5 * 60 * 1000, // 5分钟
    enabled: !!roomId,
  })
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: SendMessageParams) => messageApi.sendMessage(data),
    onSuccess: (data, variables) => {
      // 更新缓存
      queryClient.invalidateQueries({ queryKey: ['messages', variables.roomId] })
    },
  })
}

