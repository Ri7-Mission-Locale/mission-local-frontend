export default function AloneSection({children, className}) {
    return (
        <section className={"border border-gray-300 bg-gray-100 p-8 rounded-lg flex flex-col gap-5 " + className }>
            {children}
        </section>
    )
}