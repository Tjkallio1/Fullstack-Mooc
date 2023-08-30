interface ContentProps {
    content: { name: string; exerciseCount: number }[];
}

const Content = (props: ContentProps): JSX.Element => {
    return (
        <div>
            {props.content.map((part, index) => (
                <p key={index}>
                    {part.name} {part.exerciseCount}
                </p>
            ))}
        </div>
    )
}

export default Content