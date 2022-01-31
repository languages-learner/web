import firebase from 'firebase'
import { IChat } from '@/services/chat/IChat'
import ChatMessage from '@/models/ChatMessage'
import { useUserStore } from '@/store/modules/user'
import { ref, Ref, watch } from 'vue'

export type MessageCallbackType = (data: ChatMessage) => void

const enum EventType {
    NewMessage,
    OldMessage
}

export class Chat implements IChat {
    private readonly _dbReference: firebase.database.Reference
    private readonly _interval: number = 10
    private _numMaxMessage: Ref<number> = ref(this._interval)
    private _lastMessageKey?: string = undefined
    private _subscribers: Partial<Record<EventType, MessageCallbackType[]>> = {}
    private _publishedMessages: {[key: string]: boolean} = {}

    constructor() {
        this._dbReference = firebase.database().ref('messages')
    }

    private subscribe(event: EventType, callback: MessageCallbackType): () => void {
        const subscribers = this._subscribers[event]
        if (!subscribers) {
            this._subscribers[event] = []

            return this.subscribe(event, callback)
        }

        subscribers.push(callback)

        return () => this.unsubscribe(event, subscribers.length - 1)
    }

    public onNewMessage = (callback: MessageCallbackType) => this.subscribe(EventType.NewMessage, callback)

    public onOldMessage= (callback: MessageCallbackType) => this.subscribe(EventType.OldMessage, callback)

    private unsubscribe = (event: EventType, index: number): void => {
        this._subscribers[event]?.slice(index, 1)
    }

    private publish(event: EventType, data: ChatMessage) {
        if (this._publishedMessages[data.id]) return
        this._publishedMessages[data.id] = true

        const subscribers = this._subscribers[event]

        if (!subscribers) return

        subscribers.forEach(s => s(data))
    }

    public start() {
        this._dbReference.limitToLast(this._numMaxMessage.value).on('child_added', snapshot => {
            this._lastMessageKey = snapshot.key ?? undefined
            this.publishSnapshotMessage(EventType.NewMessage, snapshot)
        })

        watch(this._numMaxMessage, () => {
            this.fetchNewMessages()
        })
    }

    public stop() {
        this._dbReference.off()
    }

    async sendMessage(content: ChatMessage['content']) {
        if (!content) return

        const { profileData } = useUserStore()

        this._dbReference.push({
            content,
            username: profileData?.email,
            uid: profileData?.uid
        } as Omit<ChatMessage, 'id'>)
    }

    public loadMoreMessages() {
        this._numMaxMessage.value += this._interval
    }

    private async fetchNewMessages(): Promise<void> {
        const buffer: firebase.database.DataSnapshot[] = []
        await this._dbReference.limitToLast(this._interval * 2).endBefore(null, this._lastMessageKey).once('child_added',
            snapshot => buffer.push(snapshot))
        buffer.forEach(snapshot => this.publishSnapshotMessage(EventType.OldMessage, snapshot))
    }

    private publishSnapshotMessage(event: EventType, snapshot: firebase.database.DataSnapshot): void {
        const message = snapshot.val() as Omit<ChatMessage, 'id'>

        if (!snapshot.key) return

        this.publish(event, {
            id: snapshot.key,
            username: message.username,
            uid: message.uid,
            content: message.content
        })
    }
}
