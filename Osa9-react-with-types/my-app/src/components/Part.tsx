import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
  description?: string;
  groupProjectCount?: number;
  backgroundMaterial?: string;
  requirements?: string[];
  kind: "basic" | "group" | "background" | "special";
}

interface CoursePartProps {
  courseParts: CoursePart[];
}

const Parts: React.FC<CoursePartProps> = (props) => {
  return (
    <div>
      {props.courseParts.map((part, index) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={index}>
                <b>{part.name} {part.exerciseCount}</b>
                <p>{part.description}</p>
              </div>
            );
          case "group":
            return (
              <div key={index}>
                <b>{part.name} {part.exerciseCount}</b>
                <p>project exercises {part.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div key={index}>
                <b>{part.name} {part.exerciseCount}</b>
                <p>{part.description}</p>
                <p>{part.backgroundMaterial}</p>
              </div>
            );
            case "special":
            return (
              <div key={index}>
                <b>{part.name} {part.exerciseCount}</b>
                <p>{part.description}</p>
                <p>required skills: {part.requirements?.join(', ')}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Parts;
