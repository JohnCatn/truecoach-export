import React, { Component } from 'react';
import Exercise from "./exercise";
import { CCollapse, CButton } from '@coreui/react'

class Workout extends Component {
  state = {
    workoutItems: [],
    visible: false
  }
  componentDidMount() {
    fetch(`./data/workouts/${this.props.workoutId}.json`,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
    .then(res => res.json())
    .then((data) => {
      console.log(`got workout ${this.props.workoutId}`);
      console.log(data);
      this.setState({ workoutItems: data.workout_items });
      this.setState({ visible: false });
    })
    .catch(console.log)
  }
  render() {
    return (
       <div className="container">
        <CButton color="primary" onClick={() => this.setState({ visible: !this.state.visible })}>
          Show / Hide Details
        </CButton>
        <CCollapse visible={this.state.visible}>
        <div className="col-xs-12">
         {this.state.workoutItems.map((workoutItem) => (
          <div className="card" id={workoutItem.id}>
            <div className="card-body">
            <h4 className="card-title" dangerouslySetInnerHTML={ {__html: workoutItem.name } }/>
              <h5 className="card-title" dangerouslySetInnerHTML={ {__html: workoutItem.info} } />
              <h6 className="card-subtitle mb-2 text-muted">
                <span>
                {workoutItem.result}
                </span>
              </h6>
              {workoutItem.selected_exercises &&
              workoutItem.selected_exercises.length > 0 &&
                workoutItem.selected_exercises.map((exercise) => {
                  return <Exercise exerciseId={exercise.id} />
                })
              }
              {
                workoutItem.exercise_id && 
                <Exercise exerciseId={workoutItem.exercise_id} />
              }
              
            </div>
          </div>
        ))} 
        </div>
        </CCollapse>
       </div>
       
    );
  }
}
export default Workout;