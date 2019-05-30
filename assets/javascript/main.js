
var firebaseConfig = {
  apiKey: "AIzaSyAVHu0Pj6iNrqxr91A6JZufJ5ChBeFx9CQ",
  authDomain: "timesheet-cleve716.firebaseapp.com",
  databaseURL: "https://timesheet-cleve716.firebaseio.com",
  projectId: "timesheet-cleve716",
  storageBucket: "timesheet-cleve716.appspot.com",
  messagingSenderId: "1075477666513",
  appId: "1:1075477666513:web:386dd1087484e9a0"
};

firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
 
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var frequencyTime = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: frequencyTime
    };
  
   
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  

  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
 
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var frequencyTime = childSnapshot.val().frequency;
  
   
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(frequencyTime);
  
    // Prettify the train start
    var trainStartConvert = moment.unix(trainStart).format("h:mm A");
  
    
  
    
    // var frequencyTime = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainStartConversion = moment(trainStart, "HH:mm").subtract(1, "years");
  

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // // Difference between the times
    var diffTime = moment().diff(moment(trainStartConversion), "minutes");
    console.log("TIME DIFFERENCE: " + diffTime);

    // // Time apart (remainder)
    var tRemainder = diffTime % frequencyTime;
    console.log("TIME REMAINING: " + tRemainder);

    // // Minute Until Train
    var tMinutesTillTrain = frequencyTime - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainStartConvert),
      $("<td>").text(frequencyTime),
      $("<td>").text(nextTrain),    
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  