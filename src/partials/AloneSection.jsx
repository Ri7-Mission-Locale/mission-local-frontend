

export default function AloneSection({ children, className }) {
    return (


        <section className={" border w-fit h-fit bg-cover bg-gray-300  p-8 rounded-lg flex flex-col gap-5 " + className}>
            {children}
        </section>
    )
}

