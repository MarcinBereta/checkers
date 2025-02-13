class Net{
    constructor(){
    }
    sendAJAX(data1){
        let ile;
        $.ajax({
            url: "/getdata",
            data: { test: data1 },
            type: "POST",
            success: function (data) {
                let obj = JSON.parse(data)
                if(obj.logged==true){
                    $("#root").html("")
                    ui.wait();
                }
                if(obj.logged==false){
                    alert("JEST JUŻ 2 UŻYTKOWNIKÓW GRAJĄCYCH ZALOGOWANYCH")
                }
                if(obj.logged=="zajęty"){
                    alert("TEN NICK JEST JUŻ ZAJĘTY")
                }

            },
            error: function (xhr, status, error) {
            },
        })
        return ile
    }
    resAJAX(){
        $.ajax({
            url: "/resdata",
            data: { test: "reset"},
            type: "POST",
            success: function (data) {
                console.log(data);
                let obj = JSON.parse(data);
                console.log(obj);
                alert(obj.logged);
            },
            error: function (xhr, status, error) {
            },
        })
    }
    getAJAX(){
        let dl;
        $.ajax({
            url: "/recdata",
            data: { test: "recdata"},
            type: "POST",
            success: function (data) {

                let obj = JSON.parse(data)
                $("#root").html("")

               if(obj.len==1){
                   $("#login").html("<div>Czekasz na drugiego gracza</div>")

                   game.robkostki()
                    ui.wait();
               }
               else{
                let os
                if($("#login").text()=="Czekasz na drugiego gracza"){
                    console.log(obj)
                    $("#Gracz").html("Witaj : "+ obj.obj[0])

                   os=obj.obj[0].user
                }
                else{
                    $("#Gracz").html("Witaj : "+obj.obj[1])

                    os=obj.obj[1]
                }
                $("#login").css("display", "none")
               if($("#login").text() != "Czekasz na drugiego gracza"){
                   
                    $("#wait").css("display", "block")
                    console.log("TIMER NET ")
                    ui.timer()
                }
                   game.robkostki()
               }
            },
            error: function (xhr, status, error) {
            },
        })
        return dl
    }
   update(tab){

        $.ajax({
            url: "/update",
            data: { cos: JSON.stringify(tab)},
            type: "POST",
            success: function (data) {
                console.log("success")
            },
            error: function (xhr, status, error) {
            },
        })
    }
    getupdate(){
        $.ajax({
            url: "/updpion",
            data: { data: "update"},
            type: "POST",
            success: function (data) {
                if(data=="none"){
                }
                else{
                    let obj = JSON.parse(data)
                    console.log(obj.obj)
                    ui.clearin();
                    clearInterval(ui.iner)
                    $("#root").html("")
                    game.robkostki(obj)
                    clearInterval(ui.iner)
                }
            },
            error: function (xhr, status, error) {
            },
        }) 
    }
    
}