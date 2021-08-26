var buttoncolors=["red","blue","green","yellow"];
var gamepattern=[];
var userclickedpattern=[];


var level=0;
var started=false;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userchosencolor=$(this).attr("id");
  userclickedpattern.push(userchosencolor);
  animatepress(userchosencolor);
  playsound(userchosencolor);
  checkanswer(userclickedpattern.length-1);
});

function nextsequence()
{

  userclickedpattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomnumber=Math.floor(Math.random()*4);
  var randomchosencolor=buttoncolors[randomnumber];
  gamepattern.push(randomchosencolor);
  $("#"+randomchosencolor).fadeOut(30).fadeIn(30).fadeOut(30).fadeIn(10);
  animatepress(randomchosencolor);
  playsound(randomchosencolor);
}

function playsound(name)
{

    var a=new Audio("sounds/"+name+".mp3");
    a.play();
}

function animatepress(currentcolor)
{
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentcolor).removeClass("pressed");
  },3000);
}

function checkanswer(currentlevel)
{
  if(userclickedpattern[currentlevel]===gamepattern[currentlevel])
  {
    if (userclickedpattern.length === gamepattern.length)
    {

      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  }
  else
  {
    $("h1").text("Game Over, Press Any Key to Restart!!!");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startover();
  }
}

function startover()
{
  level=0;
  gamepattern=[];
  started=false;
}
