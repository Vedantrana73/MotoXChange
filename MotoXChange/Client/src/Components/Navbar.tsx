import { Home, LogIn, LogOutIcon, Menu } from 'lucide-react'
import logo from '../assets/logo.png'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet.tsx'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from './ui/button.tsx'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar.tsx'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink } from './ui/navigation-menu.tsx'

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className='fixed top-0 left-0 min-w-screen flex justify-between items-center px-1 bg-white shadow-md z-[1000]'>
            <div className='flex items-center font-bold text-xl md:text-2xl lg:text-3xl'>
                <img src={logo} alt="Logo" className='w-20 h-20 md:w-28 md:h-28 cursor-pointer' onClick={() => navigate('/')} />
                <div>
                    MotoXChange
                </div>
            </div>
            <Sheet>
                <SheetTrigger className="md:hidden">
                    <Menu className="w-8 h-8" />
                </SheetTrigger>
                
                <SheetContent side="left" className='z-[1000]'>
                    <div className="flex flex-col space-y-4 py-6">
                        <Avatar className='border-b border-black pb-4 flex gap-2'>

                            <AvatarImage src='https://github.com/shadcn.png' alt='Profile Image' className='rounded-full h-20 w-20' />
                            <AvatarFallback className='font-semibold bg-blue-600 text-white rounded-full h-20 w-20 text-xl'>AG</AvatarFallback>


                        </Avatar>
                        <Button asChild>
                            <NavLink to="/" className={({ isActive }) => `text-lg font-semibold ${isActive ? "text-blue-600" : "text-gray-800"} flex items-center gap-2`}>
                                <Home /> Login
                            </NavLink>
                        </Button>
                        <Button asChild>
                            <NavLink to="/" className={({ isActive }) => `text-lg font-semibold ${isActive ? "text-blue-600" : "text-gray-800"} flex items-center gap-2`}>
                                <LogIn /> Login
                            </NavLink>
                        </Button>
                    </div>

                </SheetContent>
            </Sheet>

            <NavigationMenu className='hidden md:block'>
                <NavigationMenuList className='space-x-10'>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer'>
                        Home
                    </NavigationMenuItem>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer'>
                        Contact Us
                    </NavigationMenuItem>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer'>
                        Login
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Avatar className='h-12 w-12'>
                            <AvatarImage src='https://github.com/shadcn.png' alt='profile image'/>
                            <AvatarFallback className='font-semibold bg-blue-500 text-white'>AG</AvatarFallback>
                        </Avatar>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    )
}

export default Navbar
