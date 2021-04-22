import React, { Component } from 'react';

class Exercise extends Component {
  state = {
    Exercises: []
  }
  componentDidMount() {
    fetch(`./data/exercises/${this.props.exerciseId}.json`,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
    .then(res => res.json())
    .then((data) => {
      console.log(`got Exercise ${this.props.exerciseId}`);
      console.log(data);
      this.setState({ Exercises: data.exercises });
    })
    .catch(console.log)
  }
  render() {
    return (
       <div className="container">
        <div className="col-xs-12">
         {this.state.Exercises.map((exercise) => (
          <div className="card" id={exercise.id}>
            <div className="card-body">
            <h4 className="card-title" dangerouslySetInnerHTML={ {__html: exercise.id + ': ' + exercise.exercise_name} } />
              <h5 className="card-title" dangerouslySetInnerHTML={ {__html: exercise.description} } />
              <h6 className="card-subtitle mb-2 text-muted">
                <span>
                {exercise.url}
                </span>
              </h6>
            </div>
          </div>
        ))} 
        </div>
       </div>
    );
  }
}
export default Exercise;