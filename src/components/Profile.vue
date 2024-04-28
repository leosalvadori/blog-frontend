<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong v-if="currentUser && currentUser.username">{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p v-if="currentUser && currentUser.access">
      <strong>Token:</strong>
      {{currentUser.access.substring(0, 20)}} ... {{currentUser.access.substring(currentUser.access.length - 20)}}
    </p>
    <p v-if="currentUser && currentUser.username">
      <strong>username:</strong>
      {{currentUser.username}}
    </p>
    <p v-if="currentUser && currentUser.email">
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>