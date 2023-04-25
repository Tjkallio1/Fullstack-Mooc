const Courses = ({courses}) => {
    return (
      <div>
        {courses.map(course => (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <div>
              {course.parts.map(part => (
                <p key={part.id}>
                  {part.name} {part.exercises}
                </p>
              ))}
            </div>
            <div>
                <b>Total number of exercises: {" "}
                  {course.parts.reduce((total, part) => total + part.exercises, 0)}
                </b>
            </div>
          </div>
        ))}
      </div>
    )
  }

export default Courses