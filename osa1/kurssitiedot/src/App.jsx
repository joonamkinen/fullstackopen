const Header = (props) =>{
  return(
  <div>
    <h1>{props.course}</h1>
  </div>
  )
}

const Part = (props) =>{
  return(
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts.part1} exercises={props.parts.exercises1} />
      <Part part={props.parts.part2} exercises={props.parts.exercises2} />
      <Part part={props.parts.part3} exercises={props.parts.exercises3} />
    </div>
  );
}


const Total = (props) => {
  return (
    <p>Number of exercises {props.parts.exercises1 + props.parts.exercises2 + props.parts.exercises3}</p>
  );
}

const App = () => {
  const course = 'Half Stack application development';
  const parts = {
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App