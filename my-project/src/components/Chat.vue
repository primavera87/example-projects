<template>
  <div class="chat-bot">
    <router-link class="button-back" to="/">Назад</router-link>
    <div class="chat-bot__block">
      <div class="chat-bot__main-chat-block">
        <div class="chat-bot__header">
          <div class="chat-bot__avatar">
            <img src="../assets/images/cherep-avatar.jpg"/>
          </div>
          <div class="chat-bot__title">
            <div class="chat-bot__name">Черепашка-психолог</div>
            <div class="chat-bot__position">Бесплатный консультант, помогает справиться при унизительных
              собеседованиях
            </div>
          </div>
        </div>
        <div class="chat-bot__messages" ref="chatbox" v-if="showInputChat">
          <div class="chat-bot__block-chat" v-for="(message, index) in botsMessages" :key="index">
            <div class="chat-bot__bot-message" v-if="message.question !== undefined">
              {{ message.question }}
            </div>
            <div class="chat-bot__user-message" v-if="message.answer !== undefined">
              {{ message.answer }}
            </div>
            <div class="chat-bot__load-message" v-if="message.loading">
              <div class="chat-bot__dots">...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      showInputChat: true,
      botsMessages: [
        {
          question: 'Привет! Я позитивная черепашка, помогаю справиться с психологическими проблемами при унизительном собеседовании. Чем могу помочь?',
          answer: undefined,
          loading: false,
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>
