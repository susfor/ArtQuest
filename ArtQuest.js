//hintmarker is the box itself
//hint is the button with the hint text
//

var currentAnswer; //the answer picked by user
var currentQuestion; //the question that is displayed
var currentArtwork; //the artwork that is displayed
var showhint1=false; //hintbool variables track the state of showing or hiding hints false means its currently hidden
var artList=[]; //holds all the Artworks in the game

var numCorrectAnswers;


$(document).on('ready', MainMethod);


function MainMethod()
{
  //create all our assets. Questions should come before artworks

  artList[0]=new Artwork('ArtQuest_Images/Merode.jpg',["angel-audio","tradesman-audio"]);
  artList[1]=new Artwork('ArtQuest_Images/Buddha.jpg',["hair-audio","water-audio"]);

  //var merodeQ1= new Question("What is depicted here?","A religous scene","An abstract idea","A self-portrait",1,"You're right! In fact, this depictc the Annunciation!", "Probably not: the figure with wings is an angel, meaning this is likely a religous scene.");
  //var merodeQ2= new Question("Who might have commissioned this piece?", "The Church", "A King", "A tradesman",3,"Probably! It was probably a wealthy Belgian family that commissioned this piece", "Probably not: the addition of the tradesman in the left panel would not be favoured by the Church or a King.");
  //var buddhaQ1=new Question("Who is depicted here?", "Jesus Christ", "Buddha", "King Gustav I",2,"You'right! This is a depciton of buddha offering protection. ","Probably not: the physique is too Asian-influenced to be a notable character in European history.");

artList[0].addQuestion(new Question("What is depicted here?","A religous scene","An abstract idea","A self-portrait",1,"You're right! In fact, this depictc the Annunciation!", "Probably not: the figure with wings is an angel, meaning this is likely a religous scene."));
artList[0].addQuestion(new Question("Who might have commissioned this piece?", "The Church", "A King", "A tradesman",3,"Probably! It was probably a wealthy Belgian family that commissioned this piece", "Probably not: the addition of the tradesman in the left panel would not be favoured by the Church or a King."));
artList[1].addQuestion(new Question("Who is depicted here?", "Jesus Christ", "Buddha", "King Gustav I",2,"You'right! This is a depciton of buddha offering protection. ","Probably not: the physique is too Asian-influenced to be a notable character in European history."));


//show the first artwork and question
next();


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

    //once you clikc an answer, all other answers vanish and the next button apears
    $('.answer').click(function()
      {
        $('.answer').remove();
        $('#next-button').show();
      });

//button functionality for hints
$('#first-hint').click(function()
  {

        document.getElementById(currentArtwork.hints[0]).play();

  });

$('#second-hint').click(function()
  {

        document.getElementById(currentArtwork.hints[1]).play();

  });


  //button functionality for the next button
  $('#next-button').click(function()
    {

      //this is the dieal way, but something is breaking
      //next();

      //hack way of getting a new question. Re-do in the future
      location.reload();

    });

    //Local storage stuff. Locally store the number of correct answers
    //also deal with setting the correct answers message

    numCorrectAnswers = localStorage.getItem("stored-num-correct");
    //console.log(numCorrectAnswers);
    if(numCorrectAnswers == null || isNaN(numCorrectAnswers))
      {
        numCorrectAnswers=0;
        localStorage.setItem("stored-num-correct", (numCorrectAnswers).toString(10))

      }
      else
      {
        numCorrectAnswers = parseInt(numCorrectAnswers, 10);
      }

      $('#correct-answers-message').replaceWith(numCorrectAnswers+" correct answers.");



}




  //////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////



// Arguments: image must be the name of the image, so a string, hint is String for now, questionList stores all the questions
//later: hint becomes an array
function Artwork(image, hintArray)
{
  this.image=image;
  this.hints=hintArray;
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

//used to bring up a new question, image, hints etc.
var next=function()
{

  //clear out the previous image,question, hint etc.
  $('#question').empty();
  $('#picture').empty();
  $('#fun-fact').empty();

//hide the next-button
$('#next-button').hide();

//choose the artwork and question to show
selectArtwork();

//display the stuff and hide the next button


  currentArtwork.displayImage('#picture');
  currentQuestion.displayQuestion('#question');
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
      numCorrectAnswers++;
      $('#correct-answers-message').replaceWith(numCorrectAnswers+" correct answers.");
      console.log("before local storage");
      localStorage.setItem("stored-num-correct", (numCorrectAnswers).toString(10));


      //$('#correct-answers-message').replaceWith("hahaha");
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
