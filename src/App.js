import React, { Component } from 'react';
import Workout from "./components/workout";

class App extends Component {
  state = {
    workouts: []
  }
  componentDidMount() {
    fetch('./data/workouts.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
    .then(res => res.json())
    .then((data) => {
      this.setState({ workouts: data.workouts });
    })
    .catch(console.log)
  }
  render() {
    return (
       <div className="container">
        <div className="col-xs-12">
        <h1>My Workouts</h1>
        {this.state.workouts.map((workout) => (
          <div className="card" id={workout.id}>
            <div className="card-body">
            <h4 className="card-title" dangerouslySetInnerHTML={ {__html: workout.due + ' ' + workout.id} } />
              <h5 className="card-title" dangerouslySetInnerHTML={ {__html: workout.short_description} } />
              <h6 className="card-subtitle mb-2 text-muted">
                <span>
                {workout.state}
                </span>
              </h6>
              <Workout workoutId={workout.id} />
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
}
export default App;