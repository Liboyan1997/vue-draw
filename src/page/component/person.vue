<template>
<div id="con">
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
#con{
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 6.24px;
  padding-top: 3px;
  padding-bottom: 3px;
  width: 120px;
  height: 142px;
  background-color:white;
  font-size: 10px;
  margin-bottom: 3px;
  /* background-color: yellow; */
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
#con>div{
  width: 100px;
  height: 100px;
}
#con>div{
  overflow: hidden;
  border-radius: 6.24px;
  margin-top: 3px;
  margin: 0 auto;
  width: 114px;
  height: 114px;
  /* background-color: red; */
}
#con>div>img{
  display: block;
  height: 100%;
  width: 100%;
}
</style>
