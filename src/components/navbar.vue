<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand :to="{name:'Dashboard'}">Gators Volleyball</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name:'Schedule'}">Schedule</b-nav-item>
          <b-nav-item href="#" disabled>Admin</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="guest"><em>Guest</em></b-nav-item>
          <b-nav-item-dropdown v-if="!guest && user" right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em>{{user.email}}</em>
            </template>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="!guest && !user" :to="{name:'Signup'}">Sign Up</b-nav-item>
          <b-nav-item v-if="!guest && !user" :to="{name:'EmailLogin'}">Sign In</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'navbar',
  data() {
    return {
      guest: true,
      user: null
    }
  },
  created() {
    // eslint-disable-next-line
    let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
  methods: {
    logout() {
      console.log('logging out')
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Dashboard' })
      })
        .catch(err => {
          console.err(err)
        })
    }
  }
}
</script>

<style>
</style>
