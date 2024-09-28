function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-screen h-screen p-5'>
            {children}
        </div>
    )
}

export default Container;