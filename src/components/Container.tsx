function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-full p-5'>
            {children}
        </div>
    )
}

export default Container;