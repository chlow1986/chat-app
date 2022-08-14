<template>
  <v-app style="margin-top:0; min-height: 100%;height: 100%;overflow: hidden;">
    <EmojiComponent :emoji="emoji"  v-if="emoji && emoji.length > 0"/>
    <!-- <div style="position:absolute; bottom:0; z-index: 9;" ref="box" v-for="i in 10">{{emoji}}</div> -->
    <v-card class="d-flex flex-column" style="height: 100%;overflow: hidden;">
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <div class="flex-grow-1" style="overflow: hidden;">
        <v-virtual-scroll
          id="list"
          :items="messages"
          item-height="64"
        >
          <template v-slot:default="{ item }">
            <v-list-item :key="item">
              <v-list-item-content>
                <v-list-item-title>
                  <strong>{{ item }}</strong>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
      </div>
      <div>
        <form class="d-flex align-center" @submit.prevent="onSubmit">
          <v-text-field
            label="Enter your message here"
            solo
            v-model.trim="message"
            hide-details="true"
          ></v-text-field>
          <v-btn
            color="primary"
            elevation="2"
            type="submit"
          >SEND</v-btn>
        </form>
      </div>
    </v-card>
  </v-app>
</template>

<script>
import SocketioService from './services/socketio.service.js';
import EmojiComponent from './components/EmojiComponent.vue';

export default {
  name: 'App',
  components: {
    EmojiComponent
  },
  data() {
    return {
      message: '',
      messages: [],
      emoji: ''
    };
  },
  methods:{
    // sendMessage: function(){
    //   console.log(this.message);
    //   SocketioService.sendMessage(this.message);
    // },
    onSubmit:function(e){
      e.preventDefault();
      e.stopPropagation();
      if(this.message && this.message.length > 0){
        SocketioService.sendMessage(this.message);
      }
      this.message = '';
      document.getElementById("list").scrollTop = 0;
    }
  },
  created() {
    SocketioService.setupSocketConnection();

    SocketioService.onJoinRoom();

    SocketioService.onReceive((msg)=>{
      this.messages = [...msg, ...this.messages];
    })

    SocketioService.onReceiveEmoji((emoji)=>{
      this.emoji = emoji;
      setTimeout(()=>{this.emoji = ''}, 3000);
    })
  },
  beforeUnmount(){
    SocketioService.disconnect();
  }
}
</script>

<style>
html,body, body > div{
  height: 100%;
  overflow: hidden;
}

.v-application--wrap{
  height: 100%;
  overflow: hidden;
  min-height: 100%!important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
