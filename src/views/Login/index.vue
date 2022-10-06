<template>
  <div :class="['login', { 'login--dark': isThemeDarkActive }]">
    <div class="login__container">
      <div class="login__logo">
        <LogoIcon size="96px" />
        <h1 v-text="$t('login.logo.name')" />
      </div>
      <BaseButton :label="$t('login.google')" @click="signWithGoogle">
        <GoogleIcon />
      </BaseButton>
      <span class="login__or" v-text="$t('login.or.text')" />
      <BaseInput
        class="login__email"
        :label="$t('login.form.email')"
        v-model="user.email.text"
        :error="user.email.error"
        type="text"
        @input="checkEmail"
        hideLabel
      />
      <BaseInput
        class="login__password"
        :label="$t('login.form.password')"
        v-model="user.password.text"
        :error="user.password.error"
        type="text"
        @input="checkPassword"
        hideLabel
      />
      <BaseButton
        :label="$t('login.form.submit')"
        class="login__button"
        @click="loginAction"
      />
      <div class="login__acc">
        <span
          class="login__acc__description"
          v-text="$t('login.form.no.account')"
        />
        <span
          class="login__acc__create"
          v-text="$t('login.form.create.account')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import LogoIcon from './img/LogoIcon'
import GoogleIcon from 'icons/Google'
import BaseInput from '@/components/BaseInput'
import { toggleRegisterForm } from '@/store/toggle'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { ref } from 'vue'
export default {
  name: 'LoginPage',
  components: {
    BaseButton,
    LogoIcon,
    GoogleIcon,
    BaseInput,
  },
  setup() {
    const user = ref({
      email: {
        text: '',
        error: '',
      },
      password: {
        text: '',
        error: '',
      },
    })

    const clearForm = () => {
      user.value.email.text = ''
      user.value.email.error = ''
      user.value.password.text = ''
      user.value.password.error = ''
    }

    const toggleRegisterFormAction = () => {
      toggleRegisterForm()
      clearForm()
    }

    const checkEmail = () => {
      const { email } = user.value
      if (!email.text) {
        email.error = 'login.form.email'
        return false
      }
      email.error = ''
      return true
    }

    const checkPassword = () => {
      const { password } = user.value
      if (!password.text) {
        password.error = 'add.task.form.description.error.empty'
        return false
      }
      password.error = ''
      return true
    }

    const signWithGoogle = () => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log(token, user)
      })
    }

    return {
      signWithGoogle,
      user,
      checkEmail,
      checkPassword,
      toggleRegisterFormAction,
    }
  },
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
