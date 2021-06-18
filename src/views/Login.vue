<template>
  <div>
    <vs-row>
      <vs-col vs-w="6" vs-offset="3">
        <div class="mt-20 pa-10">
          <vs-card v-if="currentlyOpenForm === 'login'">
            <div slot="header">
              <h3>Welcome Back</h3>
              <p>Sign in to continue</p>
            </div>
            <div>
              <vs-input
                label="Email"
                placeholder="you@email.com"
                v-model="loginForm.email"
                class="full-width py-8"
              />
              <vs-input
                type="password"
                label="Password"
                placeholder="*******"
                v-model="loginForm.password"
                class="full-width py-8"
              />
              <vs-divider />
              <div class="full-width" style="display: flex">
                <vs-button type="flat" @click="openForm('reset')" class="mx-4"
                  >Forgot Password</vs-button
                >
                <div style="flex-grow: 1"></div>
                <vs-button
                  type="border"
                  @click="openForm('signup')"
                  class="mx-4"
                  >Sign Up</vs-button
                >
                <vs-button type="filled" @click="login()" class="mx-4"
                  >Sign In</vs-button
                >
              </div>
            </div>
          </vs-card>

          <vs-card v-if="currentlyOpenForm === 'signup'">
            <div slot="header">
              <h3>Get Started</h3>
              <p>Sign up to get started</p>
            </div>
            <div>
              <vs-input
                label="Name"
                placeholder="Full Name"
                v-model="signupForm.name"
                class="full-width py-8"
              />
              <vs-input
                label="Email"
                placeholder="you@email.com"
                v-model="signupForm.email"
                class="full-width py-8"
              />
              <vs-input
                type="password"
                label="Password"
                placeholder="*******"
                v-model="signupForm.password"
                class="full-width py-8"
              />
              <vs-divider />
              <div class="full-width" style="display: flex">
                <vs-button type="flat" @click="openForm('login')"
                  >Back to Log In</vs-button
                >
                <div style="flex-grow: 1"></div>
                <vs-button type="filled" @click="signup()" class="mx-4"
                  >Sign Up</vs-button
                >
              </div>
            </div>
          </vs-card>

          <vs-card v-if="currentlyOpenForm === 'reset'">
            <div slot="header">
              <h3>Reset Password</h3>
              <p>Submit and check your email for reset instructions</p>
            </div>
            <div>
              <vs-input
                label="Email"
                placeholder="you@email.com"
                v-model="resetForm.email"
                class="full-width py-8"
              />
              <vs-divider />
              <div class="full-width" style="display: flex">
                <vs-button type="flat" @click="openForm('login')"
                  >Back to Log In</vs-button
                >
                <div style="flex-grow: 1"></div>
                <vs-button type="filled" @click="resetPassword()" class="mx-4"
                  >Reset</vs-button
                >
              </div>
            </div>
          </vs-card>
        </div>
      </vs-col>
    </vs-row>
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
