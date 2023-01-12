import ChatMessage from '@/models/ChatMessage'
import { MessageCallbackType } from '@/services/chat/Chat'

export interface IChat {
    start: () => void
    stop: () => void
    /**
     * @return unsubscribe method
     * */
    onNewMessage: (callback: MessageCallbackType) => () => void
    /**
     * @return unsubscribe method
     * */
    onOldMessage: (callback: MessageCallbackType) => () => void
    sendMessage: (content: ChatMessage['content']) => void
    loadMoreMessages: () => void
}
