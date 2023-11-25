"use client"
import Navigation from "@/components/Navbar"

export default async function NavigationLayout({ children }) {
    return (
        <>
        <Navigation/>
        <div className="max-w-[1024px] mx-auto px-10">
            { children }
        </div>
        </>
    )
}