import Parts from "./Part";

interface ContentProps {
    content: { name: string; exerciseCount: number, kind: "basic" | "group" | "background" | "special" } [];
}

const Content = (props: ContentProps): JSX.Element => {
    return (
        <div>
            <Parts courseParts={props.content} />
        </div>
    )
}

export default Content