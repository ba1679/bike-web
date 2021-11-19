<template>
  <div id="app" class="sitcky-footer">
    <Navbar />
    <loading-overlay :active.sync="isLoading" style="z-index: 1100" />
    <router-view />
    <Footer v-if="showFooter" class="sticky-bottom" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      breakPoint: 'breakPoint'
    }),
    showFooter () {
      if (this.$route.name === 'Route' || this.$route.name === 'Station') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    detectWindowWidth () {
      this.$store.dispatch('setBreakpoint', window.innerWidth)
    }
  },
  created () {
    this.detectWindowWidth()
    window.addEventListener('resize', this.detectWindowWidth)
  },
  unmounted () {
    window.removeEventListener('resize', this.detectWindowWidth)
  },
  watch: {
    breakPoint: {
      immediate: true,
      handler (val) {
        if (val <= 768) {
          this.$store.dispatch('setIsMobile', true)
        } else {
          this.$store.dispatch('setIsMobile', false)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/all';
</style>
