<template>
  <layout-renderer
    :menu="menu"
    :sidebar-expanded="expanded"
    :navbar-props="navbarProps"
    @logout-confirmed="doLogout"
    @toggle-sidebar="expanded = !expanded"
    :user="user"
  >
    <router-view/>
  </layout-renderer>
</template>

<script>
  import menu from '@/config/menu'
  import {mapActions, mapState} from 'vuex'

  export default {
    name: "MainLayout",
    data(){
      return {
        menu,
        expanded: true,
        navbarProps: {
          title: 'Apok-admin',
          shortTitle: 'Admin',
        },
      }
    },
    methods: {
      ...mapActions('auth', ['logout']),
      doLogout() {
        this.logout();
        this.$router.push({name: 'Login'})
      }
    },
    computed: {
      ...mapState('auth', ['user']),
    },
  }
</script>

<style lang="scss" scoped>

</style>
