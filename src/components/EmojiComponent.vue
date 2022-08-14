<template>
  <div ref="main" class="main">
    <div ref="box" class="box flying" v-for="i in 80" v-bind:key="i">{{emoji}}</div>
  </div>
</template>

<script>
  export default {
    props:{
      emoji: {
        required: true,
      }
    },
    async mounted() {
      // wait for $refs to be available
      await this.$nextTick()

      this.$refs?.box?.forEach((box) => {
        box.style.left = Math.random() * (this.$refs.main.clientWidth - box.clientWidth) + 'px';
        box.style.bottom = (-1 * Math.random() * (10)) + 'px';
        box.style.animationDuration = ((Math.random()*3)+1) + 's';
        box.style.fontSize = ((Math.floor(Math.random()*36))+16) + 'px';
        box.style.setProperty('--scale', Math.floor(Math.random()*2)+1);
        

        const startX = (Math.random()*20)+20;
        const endX = startX- (Math.random()*40);

        box.style.setProperty('--translateX', startX +'px' );
        box.style.setProperty('--translateXEnd',  endX +'px' );
        console.log(startX, endX);
      })
    }
  }
</script>

<style>
  .main{
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
  }

  .box {
    position: absolute;
    z-index: 9;
  }

  .flying {
    animation-name: flyup;
    /* animation: flyup 1.5s; */
    animation-fill-mode: forwards;
  }

  @keyframes flyup {
    0%   { 
      transform: scale(1);
    }
    30%   { 
      transform: scale(var(--scale)) translateX(var(--translateX));
      /* transform: translateX(calc(-1 * var(--translateX))) scale(var(--scale)) */
    }
    100% { 
      bottom: 120%;
      transform: scale(0.5) translateX(var(--translateXEnd));
      /* transform: translateX(var(--translateX)) scale(var(--scale)) */
    }
  }
</style>