<script setup lang="ts">
import { Chat } from '@/services/chat/Chat'
import ChatMessage from '@/models/ChatMessage'
import { onBeforeUnmount, ref, unref } from 'vue'
import { useUserStore } from '@/store/modules/user'

const chat = new Chat()
const messages = ref<Array<ChatMessage>>([])

const cancelOnNewMessageSubscription = chat.onNewMessage(data => messages.value.push(data))
const cancelOnOldMessageSubscription = chat.onOldMessage(data => messages.value.unshift(data))

onBeforeUnmount(() => {
    chat.stop()
    cancelOnNewMessageSubscription()
    cancelOnOldMessageSubscription()
})

chat.start()

const { profileData } = useUserStore()

const getMessageClasses = (message: ChatMessage) => ({
    'chat_message_current-user': message.uid === profileData?.uid
})

const inputMessageContent = ref('')

const sendMessage = () => {
    chat.sendMessage(unref(inputMessageContent))
    inputMessageContent.value = ''
}
const loadMoreMessages = () => chat.loadMoreMessages()
</script>

<template>
    <div class="chat">
        <section class="chat_container">
            <button class="chat_container_load-more" @click="loadMoreMessages">Load more</button>
            <div
                v-for="message in messages"
                :key="message.id"
                class="chat_message"
                :class="getMessageClasses(message)">
                <div class="chat_message_username">{{ message.username }}</div>
                <div class="chat_message_content">{{ message.content }}</div>
            </div>
        </section>
        <footer>
            <form @submit.prevent="sendMessage">
                <input
                    v-model="inputMessageContent"
                    type="text"
                    placeholder="Write a message..." />
                <input
                    type="submit"
                    value="Send" />
            </form>
        </footer>
    </div>
</template>

<style scoped lang="scss">
@import "styles/Chat/component";
</style>
