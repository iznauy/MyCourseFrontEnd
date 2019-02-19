<template>
  <div>
    <navi></navi>
    <login-panel v-if="$store.getters['signInState/isLogin']"></login-panel>
    <register-panel v-if="$store.getters['signInState/isRegister']"></register-panel>
    <validation-panel v-if="$store.getters['signInState/isValidation']"></validation-panel>
  </div>
</template>

<script>
  import Navi from '../common/Navi';
  import LoginPanel from './LoginPanel'
  import RegisterPanel from './RegisterPanel'
  import ValidationPanel from './ValidationPanel'

  export default {
    name: 'Login',
    components: {
      Navi, LoginPanel, RegisterPanel, ValidationPanel
    },
    methods: {
    }

  }

</script>
