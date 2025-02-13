var http = require("http");
var fs = require("fs");
var qs = require('querystring');
let obj;
let pionupdate;
function wyswietlStrone(sciezka, req, res) {
    fs.readFile(decodeURI(sciezka), function (error, data) {
        if (sciezka.includes(".css")) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
        } else if (sciezka.includes(".js")) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
        } else if (sciezka.includes(".html")) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        } else if (sciezka.includes(".jpg")) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        } else if (decodeURI(sciezka.includes(".mp3"))) {
            res.writeHead(200, { "Content-type": "audio/mpeg" });
        }
        res.end(data);
    })
}
var tab=[]

var server = http.createServer(function (req, res) {
    
    switch (req.method) {
        case "GET":
            console.log(req.url)
            if (req.url === "/") {
                wyswietlStrone("static/index.html", req, res)
            }
            else if (req.url === "/admin") {
                wyswietlStrone("static/index2.html", req, res)
            } else if (decodeURI(req.url.includes(".css")) || decodeURI(req.url.includes(".js")) || decodeURI(req.url.includes(".jpg") || decodeURI(req.url.includes(".mp3")))) {
                wyswietlStrone("static" + decodeURI(req.url), req, res)
            }
            break;
        case "POST":
            if (req.url === "/getdata") {
                var allData = "";
                req.on("data", function (data) {
                    allData += data;
                })
            
                req.on("end", function (data) {
                    var finish = qs.parse(allData)
                    console.log(finish.test)
                    if(tab[0]==finish.test){
                        obj={logged: "zajęty", user: finish.test}
                    }
                    else{
                        tab.push(finish.test)
                        console.log(tab.length)
                        if(tab.length<3){
                            if(tab.length==1){
                                obj={logged: true, user: finish.test, which:1, ile:1}
                            }
                            else{
                                obj={logged: true, user: finish.test, which:2,  ile:2}
                            }
                        }
                        else{
                            obj={logged: false, user: finish.test}
                        }
                    }
                   
                    console.log(obj)
                    res.end(JSON.stringify(obj));
                })
            }
            if (req.url === "/resdata") {
               tab=[]
                   obj={logged: "reseted"}
                    console.log(tab)
                    res.end(JSON.stringify(obj));
               
            }
            if(req.url ==="/recdata"){
                if(tab.length==1){
                    obj=tab[0]
                }
                else{
                    obj=tab[1]
                    tab[0].ile=2
                }
                res.end(JSON.stringify({obj: tab, len: tab.length}));
            }
            if(req.url==="/update"){
                var allData = "";
                req.on("data", function (data) {
                    allData += data;
                })
            
                req.on("end", function (data) {
                    var finish = qs.parse(allData)
                    console.log(JSON.parse(finish.cos))
                    pionupdate=JSON.parse(finish.cos)
                    res.end("success");
                })
            }
            if(req.url ==="/updpion"){
                if(pionupdate==undefined){
                    res.end("none");
                }
                else{
                    console.log(pionupdate)
                    res.end(JSON.stringify({obj: pionupdate}));
                    pionupdate=null;
                }
            }
           
            break;

    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});
