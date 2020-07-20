<template>
  <div id="login-container">
    <div class="column">
      <div class="card">
        <div class="card-content">
          <form-renderer
            buttons-alignment="centered"
            :fields="formFields"
            :form-var="user"
            :show-cancel="false"
            submit-button-text="Login"
            :loading="loading"
            @submit="doSubmit"
            :errors="fields"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Cookies from 'js-cookie';
  import constants from '@/config/constants'

  export default {
    name: 'Login',
    data() {
      return {
        user: {
          username: null,
          password: null
        },
        formFields: [
          [
            {
              model: 'username',
              props: {
                placeholder: 'Username',
              }
            }
          ],
          [
            {
              model: 'password',
              type: 'password',
              props: {
                placeholder: 'Password',
              }
            }
          ]
        ]
      };
    },
    computed: {
      ...mapState('auth', ['loading']),
      ...mapState('messages', ['fields']),
    },
    methods: {
      ...mapActions('auth', ['doLogin', 'getUser']),
      ...mapActions('messages', ['setFields', 'resetFields']),
      doSubmit() {
        this.resetFields();
        this.doLogin({
          username: this.user.username,
          password: this.user.password
        })
          .then(response => {
            Cookies.set(constants.SESSION_COOKIE, response.access_token);
            this.getUser();
            this.$router.push({name: 'Dashboard'});
          })
          .catch(error => {
            if(error.response.status >= 500){
              console.log("Server Error");
            }else if(error.response.status === 422){
              this.setFields({ username: error.response.data.message });
            }else{
              console.log(error.response.data.message)
            }
            this.user.password = "";

          })
      }
    },
  };
</script>

<style lang="scss">
  #login-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    & > .column {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 425px;
      width: 425px;
      .card {
        width: 100%;
      }
      .card-content {
        padding: 1em;
      }
      & > .field {
        width: 100%;
      }
    }
  }
</style>
