import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {
  const courseName = "Half Stack application development";
  
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartBasic extends CoursePartBase {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartBase {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
    kind: "background" | "basic" | "special"
  }
  
  interface CoursePartRequirements extends CoursePartBase {
    requirements: string[];
    kind: "special"
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartDescription | CoursePartRequirements;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const totalExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={totalExercises} />
    </div>
  )
};


export default App;
