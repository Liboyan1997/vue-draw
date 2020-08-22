import axios from 'axios'
const urls="http://test.szcgroup.cn/api/friends/"
const params={
  scid:"sc9526AF69EEC9FE3B",
  act_id:"313"
}
export async function getNW(url,param){
  let c={...params,...param}
  console.log(c)
 let datas=await axios({
      headers: {
        // scid: scid,
        'Content-Type': 'application/json',
        // 'user-agent': 'Mozilla/4.0 MDN Example',
      },
      method: 'get',
      url: urls+url,
      params:c
    })
  // console.log(params,c)
  return datas
}
