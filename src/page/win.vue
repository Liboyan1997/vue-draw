<template>
<div id="contain">
  <div id="title1">
    <img src="../assets/img/title.png" alt="">
  </div>
  <div id="title2">
    <img src="../assets/img/img_list.png" alt="">
  </div>
  <div class="box"  id="one">
    <div class="person" :key="h"  v-for="(j,h) in winners1">
      <img :src="j" alt="">
      <p>{{111}}</p>
    </div>
  </div>
  <div class="box" id="two">
    <div class="person" :key="h"  v-for="(j,h) in winners2">
      <img :src="j" alt="">
      <p>{{111}}</p>
    </div>
  </div>
  <div class="box" id="three">
    <div class="person" :key="h"  v-for="(j,h) in winners2">
      <img :src="j" alt="">
      <p>{{111}}</p>
    </div>
    <div class="person" :key="h"  v-for="(j,h) in winners2">
      <img :src="j" alt="">
      <p>{{111}}</p>
    </div>
  </div>
</div>
</template>

<script>
import person from './component/small_person'

export default {
   data(){
    return{
      winners1:['../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg'],
      winners2:['../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg'],
      winners3:['../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg','../../../static/img/2.jpg']
    }
},
component:{
  person
}
}
</script>

<style scoped>
#contain{
  height: 100%;
  width:100%;
  background-image: url(../assets/img/bg_2.png);
  background-size: 100% 100%;
  position: relative;
}
#title1>img{
  display: block;
  height: 100%;
  width: 100%;
}
#title2>img{
  display: block;
  height: 100%;
  width: 100%;
}
#title1{
  height: 94px;
  width: 198px;
  position: absolute;
  top: 14px;
  left: 12px;
}
#title2{
  width: 342px;
  height: 70px;
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
}
.box{
  /* background-color: red; */
  margin: 0;
  /* overflow: hidden; */
  box-sizing: border-box;
  padding: 35px 0px 31px 11px;
  background-color: rgba(255,255,255,0.5);
  display: flex;
  /* justify-content: space-between; */
  flex-wrap:wrap;
  border-radius: 16.64px;
}
#one{
  box-sizing: border-box;
  position:absolute;
  left:150px;
  top:130px;
  width:620px;height:164px;
}
#one::after{
  content: "一等奖";
  display: block;
  width: 185px;
  height: 32px;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url(../assets/img/img_4.png);
  background-size: 100% 100%;
  text-align: center;
  line-height: 32px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
}
#two{
  overflow: hidden;
  position:absolute;
  left:150px;
  top:320px;
  width:620px;height:282px;
}
#two::after{
  content: "二等奖";
  display: block;
  width: 185px;
  height: 32px;

  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);

  background-image: url(../assets/img/img_4.png);
  background-size: 100% 100%;
  text-align: center;
  line-height: 32px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
}
#three{
  width: 722px;
  height: 400px;
  position:absolute;
  right:150px;
  top:130px;
}
#three::after{
  content: "三等奖";
  display: block;
  width: 185px;
  height: 32px;

  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);

  background-image: url(../assets/img/img_4.png);
  background-size: 100% 100%;
  text-align: center;
  line-height: 32px;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
}
.person{
  box-sizing: border-box;
  width: 96px;
  height: 114px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 6.24px;
  padding: 3px 3px 0 3px;
  margin:  0 2px 6px 2px;
  /* display: flex;
  flex-wrap: wrap; */
}
.person>img{
  display: block;
  height: 90px;
  width: 90px;
  border-radius: 6.24px;
}
.person>p{
  width: 90px;
  margin: 0;
  text-align: center;
  line-height: 21px;
  height: 21px;
  font-size: 12px;
  color: rgba(21, 62, 86, 1);
  /* background-color: red; */
}
</style>
