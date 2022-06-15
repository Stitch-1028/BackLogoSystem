<template>
  <div>
    <Top></Top>
    <Sale></Sale>
    <FooterBottom></FooterBottom>
  </div>
</template>

<script>
import Top from "./Top";
import Sale from "./Sale";
import FooterBottom from "./FooterBottom";
export default {
  components: { Top ,Sale,FooterBottom},
  name: "Dashboard",
  data() {
    return {
      a:133
    }
  },
  methods:{
    
  },
  computed: {

  },
  mounted() {
    console.log("@@@",this);
  },
};
</script>

<style>
</style>
