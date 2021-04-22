'use strict';

const fs = require('fs');
var request = require('then-request');

var config = require('./config')

let rawdata = fs.readFileSync('..\\data\\workouts.json');
let workouts = JSON.parse(rawdata);

workouts.workouts.forEach(function(workout) {
    var workout_id = workout.id;
    console.log(`loading data for ${workout_id}`);
    var url = `https://${config.company}.truecoach.co/proxy/api/workouts/${workout_id}`;
    var options = {
        'headers': {
          'Authorization': `Bearer ${config.bearerToken}`,
          'Role': 'Client',
          'compressed': true,
            'accept': 'application/json',
            'content_type': 'application/json'
        }
      };
    request('GET',url,options).done((response) => {
        let data_json = JSON.parse(response.body.toString());
        let data = JSON.stringify(data_json);

        fs.writeFile(`..\\data\\workouts\\${workout_id}.json`, data, (err) => {
             if (err) throw err;
             console.log(`${workout_id} Data written to file`);
         });
        
      });
      sleep(100);
});

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }