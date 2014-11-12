//hintmarker is the box itself
//hint is the button with the hint text

$(document).on('ready', MainMethod);

var currentAnswer;

function MainMethod()
{
  //create the artworks. Questions should come before artworks
  var merodeQ1= new Question("What is this?","A dog","An altarpiece","Slutstation",2);
  var merode= new Artwork('ArtQuest_Images/Merode.jpg',"testhint",merodeQ1);

//select an artwork to show
var currentArtwork=merode;

//hide all the hin markers to start with
$('.hintmarker').hide();

//display the stuff
  currentArtwork.displayImage('#picture');
  currentArtwork.displayHint('#hint');
  currentArtwork.questionObject.displayQuestion('#question');

//button functionality
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

$('#hint1').click(function()
  {
    $('#hintmarker1').show();
  });

}

// Arguments: image must be the name of the image, so a string, hint is String for now, questionobject is a Question object
//later: hint becomes an array
function Artwork(image, hint, questionObject )
{
  this.image=image;
  this.hint=hint;
  this.questionObject=questionObject;

}

//the first f are Strings, correctAnswer is a number
function Question(questiontext,answer1,answer2,answer3,correctAnswer)
{
  this.questiontext=questiontext;
  this.answer1=answer1;
  this.answer2=answer2;
  this.answer3=answer3;
  this.correctAnswer=correctAnswer;
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
  $(location).append("<button id='answer1'>"+this.answer1+"</button>");
  $(location).append("<button id='answer2'>"+this.answer2+"</button>");
  $(location).append("<button id='answer3'>"+this.answer3+"</button>");

}

Question.prototype.checkAnswer=function()
{
  if(currentAnswer==this.correctAnswer)
    {
      alert("You are correct");
    }
    else
      {
        alert("You are wrong!");
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
