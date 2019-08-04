<template>
  <div class='signup container'>
    <b-form @submit.prevent='submitForm'>
      <b-row align-h='center'>
        <h2>Sign up</h2>
      </b-row>

      <!-- Email -->
      <!-- TODO: Play around with the :state and validation to make this clean -->
      <b-form-group label='Email address:' label-for='input-email'>
        <b-input
          id='input-email'
          v-model='form.email'
          type='email'
          required
          placeholder='Enter email'
          :state='emailValidation'
        ></b-input>
        <b-form-invalid-feedback :state='emailValidation'>Email address is required</b-form-invalid-feedback>
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

      <!-- First Name -->
      <b-form-group label='First Name:' label-for='input-first-name'>
        <b-form-input
          id='input-first-name'
          v-model='form.firstName'
          type='text'
          required
          placeholder='Enter your first name'
        ></b-form-input>
      </b-form-group>

      <!-- Last Name -->
      <b-form-group label='Last Name:' label-for='input-last-name'>
        <b-form-input
          id='input-last-name'
          v-model='form.lastName'
          type='text'
          required
          placeholder='Enter your last name'
        ></b-form-input>
      </b-form-group>

      <p class='red-text center' v-if='feedback'>{{feedback}}</p>
      <b-row align-h='end'>
        <b-button v-if="!loading" type='submit' align-h='end' variant='info'>Sign Up</b-button>
        <b-spinner v-else variant="info" label="Spinning"></b-spinner>
      </b-row>
    </b-form>
  </div>
</template>

<script>
// import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'Signup',
  data() {
    return {
      form: {
        email: '',
        password: null,
      },
      feedback: null,
      loading: false,
      slug: null
    }
  },
  computed: {
    emailValidation() {
      return this.form.email.length > 3
    }
  },
  methods: {
    submitForm() {
      console.log('submitForm called')

      // TODO -- make this validation better
      if (this.form.email == null) {
        this.form.feedback = 'Must provide an email'
        return
      }
      if (this.form.password == null) {
        this.form.feedback = 'Must provide a password'
        return
      }

      this.loading = true
      // Check if the user already exists
      db.collection('users').where('email', '==', this.form.email)
        .get()
        .then(snapshot => {
          console.log(snapshot)
          if (snapshot.size) {
            this.loading = false
            this.feedback = 'Email address already exists, please login.'
            return
          }
          console.log('Email is GOOD')
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then(cred => {
              console.log(cred.user)
              db.collection('users').doc(cred.user.uid)
                .set({
                  email: this.form.email,
                })
                .then(() => {
                  this.$router.push({ name: 'Dashboard' })
                  this.loading = false
                })
                .catch(err => {
                  console.error(err)
                  this.feedback = err.message
                  this.loading = false
                })
            })
            .catch(err => {
              console.error(err)
              this.feedback = err.message
              this.loading = false
            })
        })
    }
  }
}
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
</style>
