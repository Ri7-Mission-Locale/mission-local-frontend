

export default function AloneSection({children, className}) {
    return (
        
        <section className={" border w-full h-screen bg-black/55 bg-blend-overlay bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover  border-gray-300  p-8 rounded-lg flex flex-col gap-5 " + className }>
            {children}
        </section>
    )
}

