<template>
  <div>
    <navi></navi>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Navi from '../common/Navi';
  import LoginPanel from './LoginPanel'
  import RegisterPanel from './RegisterPanel'
  import ValidationPanel from './ValidationPanel'

  export default {
    name: 'Index',
    components: {
      Navi, LoginPanel, RegisterPanel, ValidationPanel
    },
    methods: {
    }

  }

</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .5s ease-out;
  }
  .slide-fade-leave-active {
    transition: all .5s ease-in;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(1000px);
    opacity: 0;
  }
</style>
