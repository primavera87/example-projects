<template>
<div class="chat-block">
    <button class="button button_style_2" @click="onUserExit">Выход</button>
    <section v-if="get_status_need_auth">
        <h3 class="title">Вам необходимо авторизоваться</h3>
        <ChatAddUser @authUser="onAuthUser($event)" />
    </section>
    <section v-if="get_user">
        <div class="user-info">Ваш логин:<span v-text="get_user.name"></span></div>
    </section>

    <ChatListMessages v-if="get_user" :messages="get_messages" :clientId="get_user.id" />
    <ChatAddMessage v-if="get_user" @addNewMessage="onAddNewMessage($event)" />
    
</div>
</template>

<script>
import ChatAddUser from '@/components/Chat/ChatAddUser';
import ChatAddMessage from '@/components/Chat/ChatAddMessage';
import ChatListMessages from '@/components/Chat/ChatListMessages';
import {mapGetters, mapActions} from 'vuex';

export default {
  components: {
      ChatAddUser,
      ChatAddMessage,
      ChatListMessages,
  },
  mounted() {
    this.getUser();
    this.fetchMessages();
    window.addEventListener('storage', this.onUpdateLocalStorage);
  },
  beforeDestroy() {
      window.removeEventListener('storage', this.onUpdateLocalStorage);
  },

computed: {
    ...mapGetters('data', {get_status_need_auth: 'get_status_need_auth'}),
    ...mapGetters('data', {get_user: 'get_user'}),
    ...mapGetters('data', {get_messages: 'get_messages'}),
},
methods: {
    ...mapActions('data', {getUser: 'getUser'}),
    ...mapActions('data', {fetchMessages: 'fetchMessages'}),
    ...mapActions('data', {addNewMessage: 'addNewMessage'}),
    ...mapActions('data', {addUser: 'addUser'}),
    onAddNewMessage(event) {
        this.addNewMessage({data: new Date(), message: event, user: this.get_user});
    },
    onAuthUser(name) {
        this.addUser(name);
        this.addNewMessage({data: new Date(), message: `Пользователь ${this.get_user.name} подключился к чату`, user: 'system'});
    },
    onUpdateLocalStorage() {
        this.fetchMessages();
    },
    onUserExit() {
        this.addNewMessage({data: new Date(), message: `Пользователь ${this.get_user.name} вышел из чата на главную страницу`, user: 'system'});
        this.$router.push({name: 'Main'});
    }
},
}
</script>