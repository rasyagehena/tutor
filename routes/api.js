//CREATED JimiGay ReyModeSigma

const express = require("express")  
const FormData = require("form-data");
const type = require("file-type");
const fetch = require("node-fetch");
const fs = require("fs")
const axios = require('axios')
const textto = require('soundoftext-js')
const scr = require ('@bochilteam/scraper')
const router = express.Router()

//APIKEY KONTOL
const apikey = "akusayangmamah"

//SCRAPER
const apidl = require("../lib/apidl");
const { TiktokDL } = require("../lib/tiktok");
const { musically } = require("../lib/tt");
const { spotifyy } = require("../lib/spotify");
/*const { instagram } = require("../lib/instagram");*/
const { hentaivid } = require("../lib/hentaivid");
const { xnxxdl, xnxxsearch } = require("../lib/xnxx");
const { pin, pinterest } = require("../lib/pinterest");
const { fbdl1, fbdl2 } = require("../lib/facebook");
const { capcut, capcutdl } = require("../lib/capcut");

//FUNCTION
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

async function instagram(url) {
            let res = await axios("https://indown.io/");
            let _$ = cheerio.load(res.data);
            let referer = _$("input[name=referer]").val();
            let locale = _$("input[name=locale]").val();
            let _token = _$("input[name=_token]").val();
            let { data } = await axios.post(
              "https://indown.io/download",
              new URLSearchParams({
                link: url,
                referer,
                locale,
                _token,
              }),
              {
                headers: {
                  cookie: res.headers["set-cookie"].join("; "),
                },
              }
            );
            let $ = cheerio.load(data);
            let result = [];
            let __$ = cheerio.load($("#result").html());
            __$("video").each(function () {
              let $$ = $(this);
              result.push({
                type: "video",
                thumbnail: $$.attr("poster"),
                url: $$.find("source").attr("src"),
              });
            });
            __$("img").each(function () {
              let $$ = $(this);
              result.push({
                type: "image",
                url: $$.attr("src"),
              });
            });
          
            return result;
}


//―――――――――――――――――――――――――――――――――――――――――― ┏  DOWNLOADER  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
router.get('/api/download/tiktokslide', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
          var url = req.query.url
       	if (!url) return res.json({ status: false, creator: "Agus", message: "Masukan Parameter url !" })
       TiktokDL(url)
             .then((data) => {
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: data,
      	})  	
      })
            .catch((err) => {
        console.log(err)
        res.json({err})
    })
})

router.get('/api/download/tiktok', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
          var url = req.query.url
       	if (!url) return res.json({ status: false, creator: "Agus", message: "Masukan Parameter url !" })
       let ttlu = await scr.savefrom(url)
             .then((data) => {
               if (!data.video ) return res.json(loghandler.notfound)
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: data[0],
      	})  	
      })
                  .catch((err) => {
        console.log(err)
        res.json({ message: "Terjadi kesalahan !" })
        })
})

router.get('/api/download/tiktokv2', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
          var url = req.query.url
       	if (!url) return res.json({ status: false, creator: "Agus", message: "Masukan Parameter url !" })
       let ttlu = await fetch(`https://api.tiklydown.me/api/download?url=${url}`)
.then(response => response.json())
.then(data => {
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: data,
      	})  	
      })
            .catch((err) => {
        console.log(err)
        res.json({ message: "Terjadi kesalahan !" })
    })
})

router.get("/api/download/instagram", async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let url = req.query.url
    if (!url) return res.json({ status: false, creator: "Agus", message: "Masukan Parameter url !" })
    await instagram(url)
      .then((data) => {
      	res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: data,
      	})  	
      })
      .catch((err) => {
        console.log(err)
        res.json({ message: "Terjadi kesalahan !" })
    })
})

router.get('/api/download/spotify', async (req, res, next) => {
  try {
    if (!req.query.apikey) {
      return res.json({ status: false, result: "Masukkan apikey" });
    }
    if (req.query.apikey !== apikey) {
      return res.json({ status: false, result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey" });
    }    
    const url = req.query.url;    
    if (!url) {
      return res.json({ status: false, creator: "Agus", message: "Masukkan Parameter url !" });
    }    
    const ttlu = await spotifyy(url);    
    res.set('Content-Type', 'audio/mpeg'); // Set tipe konten sebagai audio    
    // Mengirim audio sebagai buffer
    res.send(ttlu.mp3);
  } catch (err) {
    console.log(err);
    res.json({ message: "Terjadi kesalahan !" });
  }
});

      router.get("/api/download/youtube", async (req, res, next) => {
      	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
    var url = req.query.url
	if (!url) return res.json({ status: false, creator: "Agus", message: "Masukan Parameter url !" })
    await scr.youtubedl(url)
      .then((data) => {
        res.json({
          status: true,
          creator: "JimiGay ReyModeSigma",
          result: data,
        })
    })
      .catch((err) => {
        console.log(err)
        res.json({ message: "Terjadi kesalahan !" })
    })
})

router.get('/api/download/facebook', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
       let url = req.query.url
    if (!url) return res.json({ status: false, creator: "Agus", message: "Masukan Parameter url !" })
             await fbdl2(url)
             .then((data) => {
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: data,
      	})  	
      })
})

router.get("/api/download/xnxxdl", async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let url = req.query.url
    if (!url) return res.json({ status: false, creator: "Agus", message: "Masukan Parameter url !" })
    await xnxxdl(url)
      .then((data) => {
      	res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: data,
      	})  	
      })
      .catch((err) => {
        console.log(err)
        res.json({ message: "Terjadi kesalahan !" })
    })
})

router.get("/api/download/capcut", async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let url = req.query.url
    if (!url) return res.json({ status: false, creator: "Agus", message: "Masukan Parameter url !" })
    await capcutdl(url)
      .then((data) => {
      	res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: data,
      	})  	
      })
      .catch((err) => {
        console.log(err)
        res.json({ message: "Terjadi kesalahan !" })
    })
})

router.get('/api/dowloader/soundcloud', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : `Agus`, message : "[!] masukan parameter url"})   
	apidl.soundcloud(url)
	.then(data => {
		if (!data.download ) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `JimiGay ReyModeSigma`,
			result
		})
		})
         .catch(e => {         
			 console.log(e)
        res.json({ message: "Terjadi kesalahan !" })
})
})

router.get('/api/dowloader/telesticker', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	var url = req.query.url
	if (!url ) return res.json({ status : false, creator : "Agus", message : "[!] Masukan Parameter Url"})   
	if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) return res.json(loghandler.noturl)
	apidl.telesticker(url)
	.then(data => {
		var result = data
		res.json({
			status: true,
	        creator: `JimiGay ReyModeSigma`,
			result
		})
		})
         .catch(e => {
	 console.log(e)
        res.json({ message: "Terjadi kesalahan !" })
})
})




//―――――――――――――――――――――――――――――――――――――――――― ┏  Search  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
router.get("/api/pinterest/search", async (req, res, next) => {
    let text = req.query.text
    if (!text) return res.json({ status: false, creator: "Agus", message: "Masukan Query Text !" })
    await pin(text)
      .then((data) => {
      	let hti = data[Math.floor(Math.random() * data.length)];
        res.json({
          status: true,
          creator: "JimiGay ReyModeSigma",
          result: data,
        })
    })
      .catch((err) => {
        console.log(err)
        res.json({ message: "Terjadi kesalahan !" })
    })
})

router.get('/api/gempa/search', async (req, res, next) => {
       let ttlu = await scr.gempa()
             .then((data) => {
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: data,
      	})  	
      })
})

router.get("/api/search/xnxx", async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	    let text = req.query.text
    if (!text) return res.json({ status: false, creator: "Agus", message: "Masukan Query Text !" })
    await xnxxsearch(text)
      .then((data) => {
      	res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: data,
      	})  	
      })
      .catch((err) => {
        console.log(err)
        res.json({ message: "Terjadi kesalahan !" })
    })
})



//―――――――――――――――――――――――――――――――――――――――――― ┏  Game  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
router.get('/api/game/tebaklirik', async (req, res, next) => {
       await fetch(`https://JimiGay ReyModeSigma.github.io/mentahan/games/tebaklirik.json`)
.then(response => response.json())
.then(data => {
	   let result = data[Math.floor(Math.random() * data.length)];
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: result,
      	})  	
      })
})
router.get('/api/game/tebaktebakan', async (req, res, next) => {
       await fetch(`https://JimiGay ReyModeSigma.github.io/mentahan/games/tebaktebakan.json`)
.then(response => response.json())
.then(data => {
	   let result = data[Math.floor(Math.random() * data.length)];
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: result,
      	})  	
      })
})
router.get('/api/game/tebakkalimat', async (req, res, next) => {
       await fetch(`https://JimiGay ReyModeSigma.github.io/mentahan/games/tebakkalimat.json`)
.then(response => response.json())
.then(data => {
	   let result = data[Math.floor(Math.random() * data.length)];
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: result,
      	})  	
      })
})
router.get('/api/game/tebakgambar', async (req, res, next) => {
       await fetch(`https://JimiGay ReyModeSigma.github.io/mentahan/games/tebakgambar.json`)
.then(response => response.json())
.then(data => {
	   let result = data[Math.floor(Math.random() * data.length)];
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: result,
      	})  	
      })
})
router.get('/api/game/tebakjenaka', async (req, res, next) => {
       await fetch(`https://JimiGay ReyModeSigma.github.io/mentahan/games/tebakjenaka.json`)
.then(response => response.json())
.then(data => {
	   let result = data[Math.floor(Math.random() * data.length)];
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: result,
      	})  	
      })
})
router.get('/api/game/tebakkimia', async (req, res, next) => {
       await fetch(`https://JimiGay ReyModeSigma.github.io/mentahan/games/tebakkimia.json`)
.then(response => response.json())
.then(data => {
	   let result = data[Math.floor(Math.random() * data.length)];
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: result,
      	})  	
      })
})
router.get('/api/game/siapakahaku', async (req, res, next) => {
       await fetch(`https://JimiGay ReyModeSigma.github.io/mentahan/games/siapakahaku.json`)
.then(response => response.json())
.then(data => {
	   let result = data[Math.floor(Math.random() * data.length)];
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: result,
      	})  	
      })
})
router.get('/api/game/tebakbendera', async (req, res, next) => {
       await fetch(`https://JimiGay ReyModeSigma.github.io/mentahan/games/tebakbendera.json`)
.then(response => response.json())
.then(data => {
	   let result = data[Math.floor(Math.random() * data.length)];
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: result,
      	})  	
      })
})


//―――――――――――――――――――――――――――――――――――――――――― ┏  Nsfw  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
router.get('/api/nsfw/ass', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://JimiGay ReyModeSigma.github.io/mentahan/hentong/ass.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/nsfw/gif', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://JimiGay ReyModeSigma.github.io/mentahan/hentong/hnt_gifs.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/nsfw/ahegao', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://JimiGay ReyModeSigma.github.io/mentahan/hentong/ahegao.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/nsfw/bdsm', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://JimiGay ReyModeSigma.github.io/mentahan/hentong/bdsm.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/nsfw/blowjob', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://JimiGay ReyModeSigma.github.io/mentahan/hentong/blowjob.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/nsfw/cuckold', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://JimiGay ReyModeSigma.github.io/mentahan/hentong/cuckold.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/nsfw/cum', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://JimiGay ReyModeSigma.github.io/mentahan/hentong/cum.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/nsfw/cosplay', async (req, res, next) => {
  try {
    if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
    const url = req.query.url;
    const response = await axios.get(`https://api-fgmods.ddns.net/api/nsfw/cosplay?apikey=4386f8c8`, {
      responseType: 'arraybuffer'
    });
    res.type('png').send(Buffer.from(response.data, 'binary'));
  } catch (error) {
    console.error(error);
    res.json({ message: 'Terjadi kesalahan!' });
  }
});

router.get('/api/nsfw/ero', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://JimiGay ReyModeSigma.github.io/mentahan/hentong/ero.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/nsfw/pussy', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://JimiGay ReyModeSigma.github.io/mentahan/hentong/pussy.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/nsfw/hentaivid', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
       let ttlu = await hentaivid()
       let hti = ttlu[Math.floor(Math.random() * ttlu.length)];
		res.json({
      		status: true,
      		creator: "JimiGay ReyModeSigma",
      		result: hti,
      	})  
      .catch((err) => {
        console.log(err)
        res.json({ message: "Terjadi kesalahan !" })
    })
      })


//―――――――――――――――――――――――――――――――――――――――――― ┏  Asupan  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
router.get('/api/asupan/bocil', async (req, res, next) => {
  try {
    if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
    const response = await fetch('https://raw.githubusercontent.com/ArifzynXD/database/master/asupan/bocil.json');
    const data = await response.json();
    const video = data[Math.floor(Math.random() * data.length)];
    const videoBuffer = await fetch(video.url).then(res => res.buffer());
    res.type('video/mp4').send(videoBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "false", result: "Gagal mengirim video" });
  }
});

router.get('/api/asupan/rika', async (req, res, next) => {
  try {
    if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
    const response = await fetch('https://raw.githubusercontent.com/JimiGay ReyModeSigma/database2/master/asupan/rikagusriani.json');
    const data = await response.json();
    const video = data[Math.floor(Math.random() * data.length)];
    const videoBuffer = await fetch(video.url).then(res => res.buffer());
    res.type('video/mp4').send(videoBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "false", result: "Gagal mengirim video" });
  }
});



//―――――――――――――――――――――――――――――――――――――――――― ┏  Wallpaper  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
router.get('/api/wallpaper/anime', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://raw.githubusercontent.com/JimiGay ReyModeSigma/database2/master/anime/wallhp2.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/wallpaper/hp', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://raw.githubusercontent.com/JimiGay ReyModeSigma/database2/master/image/wallhp.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})

router.get('/api/wallpaper/ml', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	let rests = await fetch('https://raw.githubusercontent.com/JimiGay ReyModeSigma/database2/master/image/wallml.json')
  let rest = await rests.json()
  let image = rest[Math.floor(Math.random() * rest.length)];
  let buff = await (await fetch(image)).buffer()
res.type('png').send(buff)
})



//―――――――――――――――――――――――――――――――――――――――――― ┏  Soundoftext  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
router.get('/api/soundoftext', async (req, res, next) => {
	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
    if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
	var text1 = req.query.text
	var lan = req.query.lang
	if (!text1 ) return res.json({ status : false, creator : `Agus`, message : "[!] Masukan Parameter Text"})   
	if (!lan ) return res.json({ status : false, creator : `Agus`, message : "[!] Masukkan Format Lang Dengan Benar"})   
textto.sounds.create({ text: text1, voice: lan })
.then(soundUrl => {  
	res.json({
		status: true,
		creator: 'JimiGay ReyModeSigma',
		result: soundUrl
	})
})
.catch(e => {
	res.json("Maaf Sedang Error")
})
})



//―――――――――――――――――――――――――――――――――――――――――― ┏  Convert  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\
router.get('/api/image/jadianime', async (req, res, next) => {
  try {
  	if (!req.query.apikey) return res.json({ status: "false", result: "Masukkan apikey"})
     if (req.query.apikey !== apikey) return res.json({ status: "false", result: "Apikey Salah, Silahkan Hubungi Owner Untuk Mendapatkan Apikey"})
    const url = req.query.url;
    if (!url) {
      return res.json({ status: false, creator: 'Agus', message: 'Masukkan Parameter url!' });
    }
    const response = await axios.get(`https://api.lolhuman.xyz/api/imagetoanime?apikey=SHADOW-MD&img=${url}`, {
      responseType: 'arraybuffer'
    });
    res.type('png').send(Buffer.from(response.data, 'binary'));
  } catch (error) {
    console.error(error);
    res.json({ message: 'Terjadi kesalahan!' });
  }
});



//―――――――――――――――――――――――――――――――――――――――――― ┏  Info  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

module.exports = router 