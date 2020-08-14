<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    document.onkeydown=(e)=>{
        let el = e || event || window.event || arguments.callee.caller.arguments[0]
        //  console.log(el.key,el.keyCode)
        el.preventDefault?el.preventDefault():el.returnValue = false;
        // return false
    }
  }
}
</script>

<style>
#app{
  width: 1664px;
  height: 624px;
  /* background-color: aqua; */
  margin: 0 auto;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
