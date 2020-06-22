<template>
  <layout-renderer
    :menu="menu"
    :sidebar-expanded="expanded"
    :navbar-props="navbarProps"
    @toggle-sidebar="expanded = !expanded"
    :user="user"
  >
    <router-view/>
  </layout-renderer>
</template>

<script>
  import menu from '@/config/menu'
  import { mapState } from 'vuex'

  export default {
    name: "MainLayout",
    data(){
      return {
        menu,
        expanded: false,
        navbarProps: {
          title: 'Apok-admin Navigator',
          shortTitle: 'Apok-admin',
        },


      }
    },

    computed: {
      ...mapState('auth', ['user']),
    },
  }
</script>

<style scoped>

</style>
