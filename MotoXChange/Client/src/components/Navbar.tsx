import { CoinsIcon, Home, LogIn, LogOutIcon, Menu } from 'lucide-react'
import logo from '../assets/logo.png'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet.tsx'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from './ui/button.tsx'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar.tsx'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink } from './ui/navigation-menu.tsx'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from './ui/dropdown-menu.tsx'


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

            <NavigationMenu className='hidden md:block'>
                <NavigationMenuList className='space-x-5'>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer'>
                        Buy Car
                    </NavigationMenuItem>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer'>
                        Sell Car
                    </NavigationMenuItem>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer'>
                        <NavLink to="/emi-calculator" className={({ isActive }) => `text-lg font-semibold ${isActive ? "text-blue-600" : "text-gray-800"} flex items-center gap-2`}>
                            EMI Calculator
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer'>
                        Contact Us
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className='h-12 w-12'>
                        <AvatarImage src='https://github.com/shadcn.png' alt='profile image' />
                        <AvatarFallback className='font-semibold bg-blue-500 text-white'>AG</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-[2000]">
                    <DropdownMenuLabel>
                        My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='cursor-pointer'>
                            <Link to="/login">
                                Login
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='cursor-pointer'>Saved Cars</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer md:hidden'>Buy Used Cars</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer md:hidden'>Sell Used Car</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='cursor-pointer'>Logout</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}

export default Navbar
