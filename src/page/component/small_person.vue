<template>
<div class="pcon">
  <div><img :src="src" alt=""></div>
  <p>{{id}}</p>
</div>
</template>

<script>
export default {
  props:["id","src"],
  mounted() {
    // console.log(this.src)
  },
}
</script>

<style scoped>
.pcon{
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 6.24px;
  padding-top: 3px;
  padding-bottom: 3px;
  width: 94px;
  height: 118px;
  background-color:white;
  font-size: 10px;
  margin: 0 3px 3px 3px;
}
p{
  line-height: 24px;
  height: 24px;
  width: 100%;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  margin: 0;
  color: rgba(21, 62, 86, 1);
  /* background-color: red; */
}
.pcon>div{
  width: 100px;
  height: 100px;
}
.pcon>div{
  /* overflow: hidden; */
  border-radius: 6.24px;
  margin-top: 3px;
  margin: 0 auto;
  width: 90px;
  height: 90px;
  /* background-color: red; */
}
.pcon>div>img{
  display: block;
  height: auto;
  width: 100%;
}
</style>
