<template>
  <div class="chat-bot">
    <router-link class="button-back" to="/">Назад</router-link>
    <div class="chat-bot__block">
      <div class="chat-bot__main-chat-block">
        <div class="chat-bot__header">
          <div class="chat-bot__avatar">
            <img src="../assets/images/cherep-avatar.jpg" />
          </div>
          <div class="chat-bot__title">
            <div class="chat-bot__name">Черепашка-психолог</div>
            <div class="chat-bot__position">Бесплатный консультант, помогает справиться при унизительных собеседованиях</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat"
}
</script>

<style scoped>

</style>
