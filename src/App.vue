<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  padding: 0;
  margin: 0;
}
.button{
  position: relative;
}
.upload-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
