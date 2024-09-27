"use client"

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

function CompleteSignup() {
    const { data: session, status } = useSession()
    const [role, setRole] = useState('');
    if (status == "authenticated") {

    } else {
        redirect("/sign-in")
    }
    return (
        <div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
            </select>
        </div>
    )
}

export default CompleteSignup