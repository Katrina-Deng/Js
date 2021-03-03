<template>
  <div>
    <div class="loginBox">
      <h2>Login</h2>
      <!-- <form action=""> -->
      <div class="item">
        <!-- 非空校验 -->
        <input type="text" required v-model="username" />
        <label for="">UserName</label>
      </div>
      <div class="item">
        <!-- 非空校验 -->
        <input type="password" required v-model="password" />
        <label for="">PassWord</label>
      </div>
      <button class="btn" @click="handleLogin">
        submit
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log("res", res);
          this.$router.push("getPhotos");
        });
    },
  },
};
</script>

<style scoped></style>
