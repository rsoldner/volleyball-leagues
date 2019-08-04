<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-purple-text">Login</h2>

      <!-- Email -->
      <!-- TODO: Play around with the :state and validation to make this clean -->
      <b-form-group label='Email address:' label-for='input-email'>
        <b-input
          id='input-email'
          v-model='form.email'
          type='email'
          required
          placeholder='Enter email'
        ></b-input>
        <b-form-invalid-feedback >Email address is required</b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group label='Password:' label-for='input-password'>
        <b-form-input
          id='input-password'
          v-model='form.password'
          type='password'
          required
          placeholder='Enter password'
        ></b-form-input>
      </b-form-group>

      <p class='red-text center' v-if='feedback'>{{feedback}}</p>
      <b-row align-h='end'>
        <b-button v-if="!loading" type='submit' align-h='end' variant='info'>Login</b-button>
        <b-spinner v-else variant="info" label="Spinning"></b-spinner>
      </b-row>
      <hr>
      <!-- TODO come back to this later
      <button class="social-button" @click="socialLogin">
        <img class="google-logo" alt="Google Logo" src="static/google-logo.png">
      </button>
      -->
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      feedback: null,
      loading: null,
    }
  },
  methods: {
    login() {
      if (this.form.email == null) {
        this.feedback = 'Must provide an email'
        return
      }
      if (this.form.password == null) {
        this.feedback = 'Must provide a password'
        return
      }

      this.loading = true
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(cred => {
          this.$router.push({ name: 'Dashboard' })
          this.loading = false
        })
        .catch(err => {
          this.feedback = err.message
          this.loading = false
        })
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.push({ name: 'Dashboard' })
        this.loading = false
      }).catch((err) => {
        this.feedback = err.message
        this.loading = false
      })
    }
  }
}
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4 em;
}
.login .field {
  margin-bottom: 16px;
}
.google-logo {
  max-width: 20px;
  max-height: 20px;
}
</style>
