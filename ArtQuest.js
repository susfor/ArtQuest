//hintmarker is the box itself
//hint is the button with the hint text
//

var currentAnswer; //the answer picked by user
var currentQuestion; //the question that is displayed
var currentArtwork; //the artwork that is displayed
var showhint1=false; //hintbool variables track the state of showing or hiding hints false means its currently hidden
var artList=[]; //holds all the Artworks in the game


$(document).on('ready', MainMethod);


function MainMethod()
{
  //create all our assets. Questions should come before artworks

  artList[0]=new Artwork('ArtQuest_Images/Merode.jpg',"Look at the finger with wings. What sort of character does he remind you of?");
  artList[1]=new Artwork('ArtQuest_Images/Buddha.jpg',"Examine the hair and the body. Are they typical of Western art?");

  //var merodeQ1= new Question("What is depicted here?","A religous scene","An abstract idea","A self-portrait",1,"You're right! In fact, this depictc the Annunciation!", "Probably not: the figure with wings is an angel, meaning this is likely a religous scene.");
  //var merodeQ2= new Question("Who might have commissioned this piece?", "The Church", "A King", "A tradesman",3,"Probably! It was probably a wealthy Belgian family that commissioned this piece", "Probably not: the addition of the tradesman in the left panel would not be favoured by the Church or a King.");
  //var buddhaQ1=new Question("Who is depicted here?", "Jesus Christ", "Buddha", "King Gustav I",2,"You'right! This is a depciton of buddha offering protection. ","Probably not: the physique is too Asian-influenced to be a notable character in European history.");

artList[0].addQuestion(new Question("What is depicted here?","A religous scene","An abstract idea","A self-portrait",1,"You're right! In fact, this depictc the Annunciation!", "Probably not: the figure with wings is an angel, meaning this is likely a religous scene."));
artList[0].addQuestion(new Question("Who might have commissioned this piece?", "The Church", "A King", "A tradesman",3,"Probably! It was probably a wealthy Belgian family that commissioned this piece", "Probably not: the addition of the tradesman in the left panel would not be favoured by the Church or a King."));
artList[1].addQuestion(new Question("Who is depicted here?", "Jesus Christ", "Buddha", "King Gustav I",2,"You'right! This is a depciton of buddha offering protection. ","Probably not: the physique is too Asian-influenced to be a notable character in European history."));

//select an artwork to show


//var testnum=Math.floor((Math.random() * 2));
//var currentArtwork=artList[testnum];

//hide all the hint markers to start with
$('.hint-marker').hide();

//choose the artwork and question to show
selectArtwork();

//display the stuff
  currentArtwork.displayImage('#picture');
  currentArtwork.displayHint('#hint');
  currentQuestion.displayQuestion('#question');

//button functionality for answers

  $('#answer1').click(function()
    {
      currentAnswer=1;
      currentQuestion.checkAnswer();
    });

$('#answer2').click(function()
  {
    currentAnswer=2;
    currentQuestion.checkAnswer();
  });

  $('#answer3').click(function()
    {
      currentAnswer=3;
      currentQuestion.checkAnswer();
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



// Arguments: image must be the name of the image, so a string, hint is String for now, questionList stores all the questions
//later: hint becomes an array
function Artwork(image, hint)
{
  this.image=image;
  this.hint=hint;
  this.questionList=[];

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

//used to add questions to each artwork
Artwork.prototype.addQuestion=function(tempquestion)
{
  this.questionList.push(tempquestion);
  //console.log(this.questionList[this.questionList.length-1]);
}

//used to select a random artwork, AND a random question within it question
var selectArtwork=function()
{
  // first select an artwork
  var randArtNum=Math.floor((Math.random() * artList.length)); //index of the random artwork
  currentArtwork=artList[randArtNum];

  //then select a question
  var randQuestNum=Math.floor((Math.random() * currentArtwork.questionList.length));
  currentQuestion=currentArtwork.questionList[randQuestNum];
}

//Used to display the image of each Artwork
//location is the div where the image shows
//should be of the form '#divename'
Artwork.prototype.displayImage = function(location)
{
  //$(location).append("<img src='"+this.image+"' width='auto' height='300'> </img>");
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
