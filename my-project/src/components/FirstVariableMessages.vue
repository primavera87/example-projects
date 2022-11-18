<template>
  <div class="chat-bot__variable-block">
    <div
      v-for="modeItem in chatBotAnswers"
      :key="modeItem.value"
      v-model="answerOfChatBot"
      class="chat-bot__radio-label"
      @click="$emit('actionCredit', modeItem.value)"
    >
      {{ modeItem.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstVariableMessages",
  data() {
    return {
      answerOfChatBot: '',
    }
  },
  props: {
    chatBotAnswers: {
      type: Array,
    }
  },
}
</script>

<style scoped>

</style>
