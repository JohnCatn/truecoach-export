"use strict";

const fs = require("fs");
var request = require("then-request");

var config = require('./config')

let rawdata = fs.readFileSync("..\\data\\workouts_test.json");
let workouts = JSON.parse(rawdata);

var recorded_exercise_ids = [];

workouts.workout_items.forEach(function (workout_item) {
  var exercise_id = workout_item.exercise_id;

  if (exercise_id != null && !recorded_exercise_ids.includes(exercise_id)) {
    recorded_exercise_ids.push(exercise_id);
    get_exercise(exercise_id);
  }

  if (
    workout_item.selected_exercises &&
    workout_item.selected_exercises.length > 0
  ) {
    workout_item.selected_exercises.forEach(function (exercise) {
      if (exercise.id != null && !recorded_exercise_ids.includes(exercise.id)) {
        recorded_exercise_ids.push(exercise.id);
        get_exercise(exercise.id);
      }
    });
  }
});

function get_exercise(exercise_id) {
  console.log(`loading data for ${exercise_id}`);
  var url = `https://${config.company}.truecoach.co/proxy/api/exercises?ids=${exercise_id}`;
  var options = {
    headers: {
      Authorization:
        `Bearer ${config.bearerToken}`,
      Role: "Client",
      compressed: true,
      accept: "application/json",
      content_type: "application/json",
    },
  };
  request("GET", url, options).done((response) => {
    let data_json = JSON.parse(response.body.toString());
    let data = JSON.stringify(data_json);

    fs.writeFile(`..\\data\\exercises\\${exercise_id}.json`, data, (err) => {
      if (err) throw err;
      console.log(`${exercise_id} Data written to file`);
    });
  });
  sleep(100);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
