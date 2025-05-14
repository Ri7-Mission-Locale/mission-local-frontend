
export default function TitleWithReturn({ link, children }) {
    return (
        <section className="flex justify-between">
            <a href={link} className="font-bold text-xl text-gray-600">←</a>
            <h2 className="font-bold text-2xl flex-1 text-center">{children}</h2>
        </section>
    )
}