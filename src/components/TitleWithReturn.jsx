import {Link} from "react-router";

export default function TitleWithReturn({ link, children, className }) {
    return (
        <section className={"flex justify-between" + (className ? " " + className  : "")}>
            <Link to={link} className="font-bold text-xl text-gray-600">←</Link>
            <h2 className="font-bold text-2xl flex-1 text-center">{children}</h2>
        </section>
    )
}