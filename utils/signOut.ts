'use client'
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export async function signOutUser(session: Session) {
    await fetch('/api/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session })
    })

    signOut({ callbackUrl: '/' })
}