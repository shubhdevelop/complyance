function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-screen h-screen p-3'>
            {children}
        </div>
    )
}

export default Container;