"use strict";

const fs = require("fs");
var request = require("then-request");
var config = require('./config')

var url = `https://${config.company}.truecoach.co/proxy/api/clients/413684/workouts?order=desc&page=1&per_page=500&states=completed%2Cmissed`;
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

  fs.writeFile(`..\\data\\workouts.json`, data, (err) => {
    if (err) throw err;
    console.log(`Workouts Data written to file`);
  });
});
