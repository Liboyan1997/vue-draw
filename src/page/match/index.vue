<template>
<div id="contain" :style="{backgroundImage:'url('+bgi+')'}" v-if="flag">
  <div class="items" :key=j v-for="(i,j) in data" >
    <!-- {{i}} -->
    <div>
      <div class="img">
         <img :src="i.list[0].src" alt="">
      </div>

      <p>{{i.list[0].id}}</p>
    </div>
    <div><img src="../../assets/img/img_6.png" alt=""></div>
    <div>
      <div class="img">
        <img :src="i.list[1].src" alt="">
      </div>
      <p>{{i.list[1].id}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
   data(){
    return{
      bgi:require('../../assets/img/bg_3.png'),
    }
},
props:["data","flag"],
mounted() {
  console.log(this.data)
  this.data.forEach((value,index,arr) => {
    // console.log(typeof(value.list))
    // if(typeof(value)==undefined){
    //   console.log(typeof(value),"1")
    // }else{
    //   console.log(typeof(value),"2")
    // }
    // console.log(typeof(value))
    // if(typeof(value)==undefined){
    //    console.log(index,"index")
    // }else{
    //     console.log(index)
    // }
  });
},
}
</script>

<style scoped>
#contain{
  padding:55px 163px 55px 201px;
  box-sizing: border-box;
  height: 100%;
  width:100%;
  /* background-image: url(../../assets/img/bg_3.png); */
  background-size: 100% 100%;
  position: relative;
  display: flex;
  /* justify-content: space-between; */
  align-content: space-betwenn;
  flex-wrap:wrap;
}
.items{
  margin-right: 51px;
  width: 382px;
  height: 166px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-radius: 4.16px;
  overflow: hidden;
  padding: 6px 4px;
  box-sizing: border-box;
}
.items>div{
  height: 100%;
  overflow: hidden;
}
.items>div:nth-child(1){
  height: 100%;
  overflow: hidden;
  width: 150px;
  display: flex;
  flex-wrap:wrap ;
}
.items p{
  width: 100%;
  margin: 0;
  text-align: center;
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  letter-spacing: -2px;
}
.items>div:nth-child(3){
  height: 100%;
  overflow: hidden;
  width: 150px;
}
.items>div:nth-child(1)>.img{
  height: 134px;
  width: 150px;
   overflow:hidden;
}
.items>div:nth-child(3)>.img{
  height: 134px;
  width: 150px;
  /* display: block; */
  overflow:hidden;
}
.items>div>.img>img{
  display:block;
  width:100%;
  height:auto;
}
.items>div:nth-child(2){
  padding-top: 38px;
  width: 73px;
  display: block;
}
.items>div:nth-child(2)>img{
  height: 42px;
  width: 73px;
  display: block;
}
</style>
