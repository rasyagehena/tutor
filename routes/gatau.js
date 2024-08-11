
const fetch = require("node-fetch");

fetch("https://api.vamses.xyz/api/download/tiktokv2?url=https://www.tiktok.com/@everyonehates_vyn/video/7165029078427307290?is_from_webapp=1&sender_device=pc&web_id=7218371040236914177&apikey=akusayangmamah").then(response => response.json())
.then(data => {
  console.log(data)
})