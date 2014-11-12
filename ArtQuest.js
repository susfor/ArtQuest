//hintmarker is the box itself
//hint is the button with the hint text


var currentAnswer;
var showhint1=false; //hintbool variables track the state of showing or hiding hints false means its currently hidden


$(document).on('ready', MainMethod);


function MainMethod()
{
  //create the artworks. Questions should come before artworks
  var merodeQ1= new Question("What is this?","A dog","An altarpiece","Slutstation",2,"This fact is sooo fun!", "Actually, you're wrong!!!!");
  var merode= new Artwork('ArtQuest_Images/Merode.jpg',"testhint",merodeQ1);

//select an artwork to show
var currentArtwork=merode;

//hide all the hin markers to start with
$('.hint-marker').hide();

//display the stuff
  currentArtwork.displayImage('#picture');
  currentArtwork.displayHint('#hint');
  currentArtwork.questionObject.displayQuestion('#question');

//button functionality for answers

  $('#answer1').click(function()
    {
      currentAnswer=1;
      currentArtwork.questionObject.checkAnswer();
    });

$('#answer2').click(function()
  {
    currentAnswer=2;
    currentArtwork.questionObject.checkAnswer();
  });

  $('#answer3').click(function()
    {
      currentAnswer=3;
      currentArtwork.questionObject.checkAnswer();
    });

    //once you clikc an answer, all other answers vanish
    $('.answer').click(function()
      {
        $('.answer').remove();
      });

//button functionality for hints
$('#hint1').click(function()
  {
    if(showhint1==false)
      {
        $('#hint-marker1').show();
        showhint1=!showhint1;
      }
      else
        {
          $('#hint-marker1').hide();
          showhint1=!showhint1;
        }

  });

}


  //////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////



// Arguments: image must be the name of the image, so a string, hint is String for now, questionobject is a Question object
//later: hint becomes an array
function Artwork(image, hint, questionObject )
{
  this.image=image;
  this.hint=hint;
  this.questionObject=questionObject;

}

//the first f are Strings, correctAnswer is a number, funFact is a String
function Question(questiontext,answer1,answer2,answer3,correctAnswer,funRightFact, funWrongFact)
{
  this.questiontext=questiontext;
  this.answer1=answer1;
  this.answer2=answer2;
  this.answer3=answer3;
  this.correctAnswer=correctAnswer;
  this.funRightFact=funRightFact;
  this.funWrongFact=funWrongFact;
}

//Used to display the image of each Artwork
//location is the div where the image shows
//should be of the form '#divename'
Artwork.prototype.displayImage = function(location)
{
  $(location).append("<img src='"+this.image+"'> </img>");
}

//used to display a hint
//location should be of the form '#divename'
Artwork.prototype.displayHint=function(location)
{
  $(location).append("<p><button id='hint1'>"+this.hint+"</button></p>");
}

//used to display the question and its answers
Question.prototype.displayQuestion=function(location)
{
  $(location).append("<p>"+this.questiontext+"</p>");
  $(location).append("<button class='answer' id='answer1'>"+this.answer1+"</button>");
  $(location).append("<button class='answer' id='answer2'>"+this.answer2+"</button>");
  $(location).append("<button class='answer' id='answer3'>"+this.answer3+"</button>");

}



//used to display the funRightFact
Question.prototype.displayFunRightFact=function()
{
  $('#fun-fact').append("<p>"+this.funRightFact+"</p>");
}

//used to display the funWrongFact
Question.prototype.displayFunWrongFact=function()
{
  $('#fun-fact').append("<p>"+this.funWrongFact+"</p>");
}

Question.prototype.checkAnswer=function()
{
  if(currentAnswer==this.correctAnswer)
    {
      this.displayFunRightFact();
    }
    else
      {
        this.displayFunWrongFact();
      }
}

// show and hide the popup
// $('#sound').click(function() { $('#popUpSound').show(); });
// $('#popUpSound').click(function() { $('#popUpSound').hide(); });



//Append an image
//$('#picture').append("<img src='ArtQuest_Images/Merode.jpg'> </img>");


/* function preload()

{

var merode=loadImage("ArtQuest_Images/Merode.jpeg");

}

function setup()
{
  noCanvas();

  $('#picture').add(merode);

}


function draw()
{

}
*/
