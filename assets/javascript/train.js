// Initialize Firebase

var config = {
    apiKey: "AIzaSyA9cjdK2XjSWZu_Ml2AYvqMaTNykPrkH7Y",
    authDomain: "train-homework-465f2.firebaseapp.com",
    databaseURL: "https://train-homework-465f2.firebaseio.com",
    projectId: "train-homework-465f2",
    storageBucket: "train-homework-465f2.appspot.com",
    messagingSenderId: "191261657249"
  };
  firebase.initializeApp(config);

  // global variables
var database = firebase.database();
// event handler for submit button
$(document).on("click", ".btn", function(event) {
    event.preventDefault();
    // set variables equal to values
    var trainName = $("#train-name").val().trim();
    var trainDest = $("#train-dest").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFreq = Number($("#train-freq").val().trim());
    // clear fields after values have been saved
    $("#train-name").val("");
    $("#train-dest").val("");
    $("#train-time").val("");
    $("#train-freq").val("");
    var newTrain = {
        trainName: trainName,
        trainDest: trainDest,
        trainTime: trainTime,
        trainFreq: trainFreq
    };
    database.ref().push(newTrain);
});
// event handler for firebase child addition
database.ref().on("child_added", function(snapshot) {
    // set variables equal to firebase values
    var trainName = snapshot.val().trainName;
    var trainDest = snapshot.val().trainDest;
    var trainFreq = snapshot.val().trainFreq;
    var trainTime = snapshot.val().trainTime;
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);    

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");

    // set variables equal to values and append
    var newTR = $("<tr>");
    var nameTD = $("<td>" + trainName + "</td>");
    var destTD = $("<td>" + trainDest + "</td>");
    var freqTD = $("<td>" + trainFreq + "</td>");
    var nextTD = $("<td>" + nextTrainFormatted + "</td>");
    var awayTD = $("<td>" + tMinutesTillTrain + "</td>");
    $(newTR).append(nameTD, destTD, freqTD, nextTD, awayTD);
    $("tbody").append(newTR);
})
