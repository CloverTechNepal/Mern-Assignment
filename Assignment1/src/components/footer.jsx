import Image from "next/image"
export const Footer = () => {
    return(
        <footer className="w-full  flex flex-col gap-y-[-10px]">
            <div className='bg-hero border-hero border-t-2 pt-3 pb-3'>
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Image src="/logo.jpg" alt='logo' width={50} height={50} />
                    <span className="ml-3 text-xl font-pacifico font-footer">Clover Tech Nepal</span>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-sm text-lcolor">© 2024 Clover Tech Nepal. All rights reserved.</p>
                  </div>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="font-semibold text-gray-600 hover:text-slate-800">Privacy Policy</a>
                    <a href="#" className="font-semibold text-gray-600 hover:text-slate-800">Terms of Service</a>
                    <a href="#" className="font-semibold text-gray-600 hover:text-slate-800">Contact Us</a>
                  </div>
                </div>
            </div>
        </footer>
    )
}