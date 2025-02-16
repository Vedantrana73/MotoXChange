import { CoinsIcon, Home, LogIn, LogOutIcon, Menu } from 'lucide-react'
import logo from '../assets/logo.png'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet.tsx'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from './ui/button.tsx'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar.tsx'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink } from './ui/navigation-menu.tsx'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from './ui/dropdown-menu.tsx'
import useUserStore from '../store/userStore.ts'
import { useTheme } from './theme-provider.tsx'
import { useState } from 'react'
import { Switch } from './ui/switch.tsx'
import { Label } from './ui/label.tsx'

function Navbar() {
    const { user, setUserField } = useUserStore();
    const { setTheme } = useTheme();
    const [themeControl, setThemeControl] = useState<string>(localStorage.getItem("vite-ui-theme"));
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserField("userId", null);
        localStorage.removeItem('userId');
        navigate('/login');
    }

    const handleDarkMode = () =>{
        if(themeControl==='dark'){
            setTheme('light');
            setThemeControl('light');
        }
        else
        {
            setTheme('dark');
            setThemeControl('dark');
        }
    }
    return (
        <nav className='fixed top-0 left-0 min-w-screen flex justify-between items-center px-1 shadow-md z-[1000] bg-white dark:bg-slate-950'>
            <div className='flex items-center font-bold text-xl md:text-2xl lg:text-3xl'>
                <img src={logo} alt="Logo" className='w-20 h-20 md:w-28 md:h-28 cursor-pointer' onClick={() => navigate('/')} />
                <div>
                    MotoXChange
                </div>
            </div>

            <NavigationMenu className='hidden md:block'>
                <NavigationMenuList className='space-x-5'>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer' onClick={() => navigate('/buy-car')}>
                        Buy Car
                    </NavigationMenuItem>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer' onClick={() => {
                        user.userId ? navigate('/sell-car') : navigate('/login')
                    }}>
                        Sell Car
                    </NavigationMenuItem>
                    <NavigationMenuItem className='text-lg font-semibold cursor-pointer'>
                        <NavLink to="/emi-calculator" className={({ isActive }) => `text-lg font-semibold ${isActive ? "text-yellow-500" : ""} flex items-center gap-2`}>
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
                    <div className="flex items-center space-x-2">
                        <Switch id="dark-mode" checked={themeControl==='dark'?true:false} onCheckedChange={handleDarkMode}/>
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                    <DropdownMenuGroup>
                        {!user.userId && <DropdownMenuItem className='cursor-pointer'>
                            <Link to="/login">
                                Login
                            </Link>
                        </DropdownMenuItem>}
                        <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => {
                            user.userId ? navigate('/saved-cars') : navigate('/login')
                        }}>Saved Cars</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer md:hidden'>Buy Used Cars</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer md:hidden'>Sell Used Car</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {user.userId && <DropdownMenuGroup>
                        <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuGroup>}
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}

export default Navbar
