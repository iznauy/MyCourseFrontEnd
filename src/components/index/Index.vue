<template>
  <div>
    <navi></navi>
    <router-view></router-view>
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
