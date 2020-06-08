<template>
  <div class="container">
    <div class="cell">
      <h1>404</h1>
      <p>This isn't the page you're looking for</p>
      <p>
        <button-renderer @click="goBack" variant="info" icon="chevron-left">Go Back</button-renderer>
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'NotFoundPage',

        methods: {
            goBack() {
                this.$router.go(-1);
            },
        },
    };
</script>

<style scoped lang='scss'>
  .container {
    min-height: 100vh;
    display: flex;
    .cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1 1 auto!important;
    }
    .text-center{
      text-align: center;
    }
  }
</style>
