var panel = $("#quiz-area");

var countStartNumber = 30;

// Question set
var questions = [
    
    {
        question: "What was the number one song for 2017",
        answers: ["Despacito(Remix)", "Shape Of You", "PassionFruit", "Wild Thoughts"],
        correctAnswer: "Shape Of You",
        image: "assets/Shape_Of_You_(Official_Single_Cover)_by_Ed_Sheeran.png"
    },

    {
        question: "What was the number one song for 2018",
        answers: ["Finesse", "Rock Star", "Havana", "God's Plan"],
        correctAnswer: "Rock Star",
        image: "assets/rockstar.jpg"
    },

        {
        question: " Presented in January of 2018, who won the Grammy Award for Album of the Year",
        answers: ["The Story of O.J.", "Humble", "Redbone", "24K Magic"],
        correctAnswer: "24K Magic",
        image: "assets/Bruno_Mars_-_24K_Magic_(Official_Album_Cover).png"
    },

    {
        question: "Who won all six Grammy Awards for which he was nominated at the 60th Annual Grammy Awards",
        answers: ["Rihanna", "Jay-Z", "Ed Sheeran", "Bruno Mars"],
        correctAnswer: "Bruno Mars",
        image: "assets\taylor-swift-1479151748.jpg"
    },

    {
        question: "American singer and songwriter Alecia Beth Moore is better known as",
        answers: ["Pink", "Shakira", "Beyonce", "Rihanna"],
        correctAnswer: "Pink",
        image: "assets\pink.png"
    }


]

// Variable to hold our setInterval
var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function() {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("TIME UP");
            game.timeUp();
        }
    },

    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++)
        {
            panel.append("<button class='answer-button' id='button' data-name='" +
            questions[this.currentQuestion].answers[i] +
            "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        game.counter = countStartNumber;
        $("#counter-number").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function() {
        
        clearInterval(timer);

        $("#counter-number").html(game.counter);

        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        panel.append("<img src='" + questions[this.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },

    results: function() {

        clearInterval(timer);

        panel.html("<h2>All done, here's how you did!</h2>");

        $("#counter-number").html(game.counter);

        panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (game.correct + game.incorrect)) + "</h3>");
        panel.append("<br><button id='start-over'>Start Over?</button>");
        
    },

    clicked: function(e) {

        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) 
        {
            this.answeredCorrectly();
        }
        else
        {
            this.answeredIncorrectly();
        }

    },

    answeredIncorrectly: function() {

        game.incorrect++;

        clearInterval(timer);

        panel.html("<h2>Nope!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },

    answeredCorrectly: function() {

        game.correct++;

        clearInterval(timer);

        panel.html("<h2>Correct!</h2>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }

    },

    reset: function() {

        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();

    }

};


// CLICK EVENTS
// ----------------------------------------------------------------
$(document).on("click", "#start-over", function() {
    game.reset();
});

$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);
});

$(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30 </span> Seconds</h2>");
    game.loadQuestion();
});