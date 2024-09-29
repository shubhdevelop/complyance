"use client"

import React from 'react'
import AuthButton from './AuthButton'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    return (
        <nav className='p-3 border-[.3px] flex flex-row justify-between items-center'>
            <Link href={"/app"}>
                <h1 className="scroll-m-20 text-lg font-extrabold tracking-tight lg:text-xl">
                    Complyance
                </h1>
            </Link>
            <div className='flex flex-row justify-between gap-5'>
                {
                    isLoggedIn ? (<div className='flex items-center gap-3'>  <Link href={"/select-role"} className="border-[1px] py-1 px-2 rounded-md"  > Select Role </Link> <AuthButton variant="Log Out" to={"/sign-in"} onClick={() => signOut()} /> </div>) : (<>
                        <AuthButton variant='Sign Up' to={"/sign-up"} />
                    </>)
                }
                <Link href={'/profile'} className="rounded-full w-10 h-10 overflow-hidden bg-white">
                    <Image width={50} height={50} alt="profile pic" src={session?.user?.image || ""} />
                </Link>
            </div >

        </nav >
    )
}

export default Navbar