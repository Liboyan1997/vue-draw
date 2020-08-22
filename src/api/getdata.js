import axios from 'axios'
const url="http://test.szcgroup.cn/api/friends/pair/"
const params={
  scid:"sc9526AF69EEC9FE3B",
  act_id:"313"
}
export async function getData(urls,data){
  let param={...params,...data}
console.log(param)
  // console.log(params,c)
    await axios({
      headers: {
        // scid: scid,
        'Content-Type': 'application/json',
        // 'user-agent': 'Mozilla/4.0 MDN Example',
      },
      method: 'get',
      url: url+urls,
      params:param
    })

}
