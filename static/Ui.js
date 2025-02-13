class Ui {
  constructor() {
    console.log("załadowano UI")
    console.log("załadowano Game")
    $("#log").on("click", function () {
      let x = $("#text").val()
      net.sendAJAX(x);
    })
    $("#res").on("click", function () {
      let x = $("#text").val()
      console.log(x)
      net.resAJAX();
    })
    this.iner=null;
  }
  wait() {
    net.getAJAX()
  }
  timer() {
      let czas = 30;
      this.prawda=true;
      console.log("TIMER UI")
      clearInterval(this.iner)
    if(this.prawda==true){
      this.iner = setInterval(function () {
        if (czas >= 10) {
          $("#timer").html("00:" + czas)
        }
        else {
          $("#timer").html("00:0" + czas)
        }
        if(czas!=0){
          czas--;
        }
        net.getupdate();
        console.log("testuje")
      }, 1000)
    }
   
  }
  clearin(){
    this.prawda=false;
    clearInterval(this.iner)
    $("#wait").css("display", "none")
    console.log("STOPN");
  }


}