const Course = ({course}) =>{
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
      <div>
        <Header course = {course.name}/>
        <Content parts = {course.parts}/>
        <Total sum={total}/>
      </div>
    )
  }
  
const Header = ({ course }) => <h1>{course}</h1>
  
const Total = ({ sum }) => <p>Number of exercises {sum}</p>
  
const Part = ({ part }) => 
    <p>
        {part.name} {part.exercises}
    </p>
  
const Content = ({ parts }) => (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )

export default Course