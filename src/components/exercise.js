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
                <span>
                 <a href={exercise.url}>Instruction Video</a>
                </span>
        ))} 
        </div>
       </div>
    );
  }
}
export default Exercise;