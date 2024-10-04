"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'; 

const Header = () => {
    const pathname = usePathname();

    return (
        <header className='bg-white z-50 h-20 w-full border-b-2 border-slate-200 px-4 fixed top-0 transition duration-500'>
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="pt-8 pl-4 pb-7 flex items-center">
                    <Image src="/logo.jpg" height={50} width={50} alt='Clover tech logo' />
                    <h1 className='font-extrabold text-slate-500 text-lg'>Clover Tech Nepal</h1>
                </div>
                <div className="flex items-center justify-around h-full gap-3">
                    <Link href="/">
                        <Button size="sm" variant={pathname === "/" ? "ghost" : "default"} className='font-[900]'>
                            Home
                        </Button>
                    </Link>
                    <Link href="/post">
                        <Button size="sm" variant={pathname === "/post" ? "ghost" : "default"} className='font-[900]'>
                            Post
                        </Button>
                    </Link>
                    <Link href="/comment">
                        <Button size="sm" variant={pathname === "/comment" ? "ghost" : "default"} className='font-[900]'>
                            Comment
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
