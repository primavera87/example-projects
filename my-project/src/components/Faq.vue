<template>
  <div>
    <router-link class="button-back" to="/">Назад</router-link>
    <div class="faq">
      <div class="faq__wrapper">
        <div class="faq__questions">
          <div class="faq__questions_wrapper">
            <template v-for="(qa, index) in faq">
              <div class="faq__questions_item" :class="{'active': qa.active}" @click="toggleQA(qa)">
                <div class="faq__question-block">
                  <div class="faq__question" v-html="qa.question"/>
                  <div class="faq__arrow">
                    <i v-if="!arrow" :class="{'faq__arrow_top': qa.active}"></i>
                    <i v-if="arrow"></i>
                  </div>
                </div>
                <transition name="fade" v-if="qa.active">
                  <div class="faq__questions_content" v-html="qa.answer"/>
                </transition>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "Faq",
  data() {
    return {
      arrow: false,
      faq: [
        {
          question: "Как мне быть, если моего ребенка обижают в школе",
          answer: "В первую очередь вам стоит обратиться к учителю",
        },
        {
          question: "Что делать, если ребенку трудно адаптироваться в школе?",
          answer: "Нужно обратиться к школьному психологу. Также старайтесь больше времени уделять вашему малышу"
        },
        {
          question: "Что делать, если у моего ребенка ночные истерики?",
          answer: "Нужно обратиться к хорошему детскому психотерапевту"
        }
      ],
    }
  },
  methods: {
    toggleQA(qa) {
      Vue.set(qa, 'active', !qa.active);
    }
  }
}
</script>

<style scoped>

</style>
