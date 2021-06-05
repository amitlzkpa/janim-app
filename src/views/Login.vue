<template>
  <div>
    <div>
      <form v-if="currentlyOpenForm === 'login'" @submit.prevent>
        <h1>Welcome Back</h1>
        <div>
          <label for="email1">Email</label>
          <input
            v-model.trim="loginForm.email"
            type="text"
            placeholder="you@email.com"
            id="email1"
          />
        </div>
        <div>
          <label for="password1">Password</label>
          <input
            v-model.trim="loginForm.password"
            type="password"
            placeholder="******"
            id="password1"
          />
        </div>
        <button @click="login()">Log In</button>
        <div>
          <button @click="openForm('reset')">Forgot Password</button>
          <button @click="openForm('signup')">Create an Account</button>
        </div>
      </form>

      <form v-else-if="currentlyOpenForm === 'signup'" @submit.prevent>
        <h1>Get Started</h1>
        <div>
          <label for="name">Name</label>
          <input
            v-model.trim="signupForm.name"
            type="text"
            placeholder="John Doe"
            id="name"
          />
        </div>
        <div>
          <label for="email2">Email</label>
          <input
            v-model.trim="signupForm.email"
            type="text"
            placeholder="you@email.com"
            id="email2"
          />
        </div>
        <div>
          <label for="password2">Password</label>
          <input
            v-model.trim="signupForm.password"
            type="password"
            placeholder="min 6 characters"
            id="password2"
          />
        </div>
        <button @click="signup()">Sign Up</button>
        <div>
          <button @click="openForm('login')">Back to Log In</button>
        </div>
      </form>

      <form v-else-if="currentlyOpenForm === 'reset'" @submit.prevent>
        <h1>Reset Password</h1>
        <div>
          <label for="email3">Email</label>
          <input
            v-model.trim="resetForm.email"
            type="text"
            placeholder="you@email.com"
            id="email3"
          />
        </div>
        <button @click="resetPassword()">Reset</button>
        <div>
          <button @click="openForm('login')">Back to Log In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentlyOpenForm: "login",
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        email: "",
        password: "",
      },
      resetForm: {
        email: "",
      },
    };
  },
  methods: {
    openForm(formLabel) {
      this.currentlyOpenForm = formLabel;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
      });
    },
    resetPassword() {
      this.$store.dispatch("reset", {
        email: this.resetForm.email,
      });
    },
  },
};
</script>

<style scoped></style>
