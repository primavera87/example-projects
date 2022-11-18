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
        <div class="chat-bot__message-box" v-if="showInputChat">
          <first-variable-messages :chat-bot-answers="chatBotAnswers[0]"
                           @actionCredit="actionCredit"
                           v-if="showAnswers"
          />
          <div v-if="showInputChat">
            <div class="chat-bot__input-block" v-if="this.botsMessages.length === 3">
              <input v-model="messagesAnswers.nameMessage" class="chat-bot__input-message">
              <button @click="sendMessage" class="chat-bot__button">Отправить</button>
            </div>
            <div class="chat-bot__input-block" v-if="this.botsMessages.length === 4">
              <input v-model="messagesAnswers.mailMessage" class="lds-chat-bot__input-message"/>
              <button @click="sendMessage" class="chat-bot__button">Отправить</button>
            </div>
            <div class="chat-bot__input-block" v-if="this.botsMessages.length === 5">
              <input v-model="messagesAnswers.phoneMessage" class="chat-bot__input-message"/>
              <button @click="sendMessage" class="chat-bot__button">Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FirstVariableMessages from "./FirstVariableMessages.vue";
import Vue from "vue";
export default {
  name: "Chat",
  components: {
    FirstVariableMessages,
  },
  data() {
    return {
      showInputChat: true,
      chatBotAnswers: [],
      showAnswers: true,
      messagesAnswers: {
        sumMessage: null,
        creditHistory: null,
        nameMessage: null,
        mailMessage: null,
        phoneMessage: null,
      },
      botsMessages: [
        {
          question: 'Привет! Я позитивная черепашка, подбираю лучших психологов в нашем городе. Какие цены вас интересуют?',
          answer: undefined,
          loading: false,
        },
      ],
      botsMessagesWithQuestions: [
        {
          question: 'Привет! Меня зовут Елена. Я бесплатно помогу Вам подобрать лучшее предложение среди микрозаймов. Одобренный займ вы сможете получить уже через несколько минут.\n' +
            ' Какая сумма Вам нужна?',
          answer: undefined,
          loading: false,
        }, {
          question: 'Вам нужна женщина или мужчина',
          answer: undefined,
          loading: false,
        }, {
          question: 'Как Вас зовут?',
          answer: undefined,
          loading: false,
        }, {
          question: 'Укажите пожалуйста ваш E-mail',
          answer: undefined,
          loading: false,
        }, {
          question: 'Укажите пожалуйста Ваш номер телефона для смс подтверждений',
          answer: undefined,
          loading: false,
        }
      ],
      answerForChatBot: [
        {
          answer: [
            {
              value: '2000',
              name: 'до 2000',
            },
            {
              value: '5000',
              name: 'до 5000',
            },
            {
              value: '10000',
              name: 'до 10000',
            }
          ]
        },
        {
          answer: [
            {
              value: 'women',
              name: 'Женщина',
            },
            {
              value: 'men',
              name: 'Мужчина',
            },
            {
              value: 'noMatter',
              name: 'Все равно',
            }
          ]
        }
      ],
    }
  },
  mounted() {
    this.chatBotAnswers.push(this.answerForChatBot[0].answer);
  },
  methods: {
    async actionCredit(value) {
      if (value === 'до 2000' || value === '5000' || value === '10000') {
        this.messagesAnswers.sumMessage = value;
        this.chatBotAnswers = []
        this.botsMessages[0] = {
          question: 'Привет! Я позитивная черепашка психолог. Могу подобрать для вас лучших психологов нашего города. Какие цены вас интересуют',
          answer: 'Нужна консультация ' + value + ' рублей',
          loading: true,
        };
        setTimeout(() => {
          this.botsMessages[0].loading = false;
          this.botsMessages[1] = {
            question: this.botsMessagesWithQuestions[1].question,
            answer: undefined,
            loading: false,
          };
          this.chatBotAnswers.push(this.answerForChatBot[1].answer);

          this.scrollTick();
        }, 2000);
        this.scrollTick();
      } else if (value === 'women' || value === 'man' || value === 'noMatter') {
        this.messagesAnswers.creditHistory = value;
        this.chatBotAnswers = []
        this.botsMessages[1] = {
          question: this.botsMessagesWithQuestions[1].question,
          answer: value === 'women' ?
            'Женщина' :
            value === 'man' ?
              'Мужчина' : 'Все равно',
          loading: true,
        };
        setTimeout(() => {
          this.showAnswers = false;
          this.botsMessages[1].loading = false;
          this.botsMessages[2] = {
            question: this.botsMessagesWithQuestions[2].question,
            answer: undefined,
            loading: false,
          };
          this.scrollTick();
        }, 2000);
        this.scrollTick();
      }
    },

    sendMessage(val) {
      val.preventDefault();

      if (this.botsMessages.length == 3) {
        this.buildChat('nameMessage', 2, 3, 0);
      }

      if (this.botsMessages.length == 4) {
        this.buildChat('mailMessage', 3, 4, 1);
      }

      if (this.botsMessages.length == 5) {
        if (this.isEmpty(this.messagesAnswers.phoneMessage)) return;

        Vue.set(this.botsMessages, 4, {
          question: this.botsMessagesWithQuestions[4].question,
          answer: this.messagesAnswers.phoneMessage,
          loading: true,
        });

        setTimeout(() => {
          Vue.set(this.botsMessages, 4, {
            question: this.botsMessagesWithQuestions[4].question,
            answer: this.messagesAnswers.phoneMessage,
            loading: false,
          });
          this.showInputChat = false;

        }, 2000);
        this.scrollTick();
      }
    },
    scrollTick() {
      this.$nextTick(() => {
        this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
      })
    },
  }
}
</script>

<style scoped>

</style>
