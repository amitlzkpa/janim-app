<template>
  <div>
    <v-container>
      <v-form v-if="currentlyOpenForm === 'login'">
        <p class="text-h4 font-weight-light">Welcome Back</p>
        <v-row>
          <v-col cols="12">
            <v-text-field
              class="my-2"
              outlined
              hide-details
              label="Email"
              placeholder="you@email.com"
              v-model.trim="loginForm.email"
            ></v-text-field>
            <v-text-field
              class="my-2"
              type="password"
              outlined
              hide-details
              label="Password"
              placeholder="******"
              v-model.trim="loginForm.password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn color="primary" dark block @click="login()">Log In</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-btn outlined plain text block @click="openForm('reset')"
              >Forgot Password</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn outlined plain text block @click="openForm('signup')"
              >Create an Account</v-btn
            >
          </v-col>
        </v-row>
      </v-form>

      <v-form v-else-if="currentlyOpenForm === 'signup'">
        <p class="text-h4 font-weight-light">Get Started</p>
        <v-row>
          <v-col cols="12">
            <v-text-field
              class="my-2"
              outlined
              hide-details
              label="Name"
              placeholder="John Doe"
              v-model.trim="signupForm.name"
            ></v-text-field>
            <v-text-field
              class="my-2"
              outlined
              hide-details
              label="Email"
              placeholder="you@email.com"
              v-model.trim="signupForm.email"
            ></v-text-field>
            <v-text-field
              class="my-2"
              type="password"
              outlined
              hide-details
              label="Password"
              placeholder="******"
              v-model.trim="signupForm.password"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn color="primary" dark block @click="signup()">Sign Up</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn outlined plain text block @click="openForm('login')"
              >Back to Log In</v-btn
            ></v-col
          >
        </v-row>
      </v-form>

      <v-form v-else-if="currentlyOpenForm === 'reset'">
        <p class="text-h4 font-weight-light">Reset Password</p>
        <v-text-field
          class="my-2"
          outlined
          hide-details
          label="Email"
          placeholder="you@email.com"
          v-model.trim="resetForm.email"
        ></v-text-field>
        <v-row>
          <v-col cols="12">
            <v-btn color="primary" dark block @click="resetPassword()"
              >Reset</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn outlined plain text block @click="openForm('login')"
              >Back to Log In</v-btn
            ></v-col
          >
        </v-row>
      </v-form>
    </v-container>
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
