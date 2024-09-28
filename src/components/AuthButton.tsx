"use client"
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

function AuthButton({ variant, to, onClick }: { variant: "Sign In" | 'Sign Up' | "Log Out", to: string, onClick?: () => void }) {
    const isLogOutButton = variant === "Log Out"
    if (isLogOutButton) {
        return <Button onClick={onClick} >{variant}</Button>
    }
    return (
        <Link href={to}>
            <Button >{variant}</Button>
        </Link>
    )
}

export default AuthButton;