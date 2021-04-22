## TrueCoach.co Data Extract
Extract raw data from true coach, they don;t offer an extract capability and given the data is about me I wanted a copy so have written these scripts as a quick hack to extract my data.

### Limitations
* Hardcoded to retrieve 500 workouts - manually update on line 6 of `src\get_workouts.js`
* minimal error handling
* no rate limiting, no idea if true coach implement this so be careful, for their sake and yours
* need to get authentication token manually
* no pagination on results

### Functionality
3 seperate scripts load the following json data
* `src\get_workouts.js` - loads summary workout data into `data\workouts.json`
* `src\get_workout_details.js` - loads workout details for each workout stored in `data\workouts.json` and populates files under `data\workouts`
* `src\get_exercise_details.js` - loads exercise details for each workout stored in `data\workouts.json` and populates files under `data\exercises`

### Getting Authentication Details
Using chrome:
* log into the website at https://truecoach.co
* right click on the browser and select `Inspect`
* select the network tab in developer tools and then refresh the page
* filter the network calls using `proxy/api`
* select one of the calls, select Headers in the detail tab
* copy the token under the `Authorization` request header
* add the token to `src/config.js`
