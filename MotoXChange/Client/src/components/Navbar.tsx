import logo from '../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar.tsx'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink } from './ui/navigation-menu.tsx'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from './ui/dropdown-menu.tsx'
import useUserStore from '../store/userStore.ts'
import { useTheme } from './theme-provider.tsx'
import { useEffect, useState } from 'react'
import { Switch } from './ui/switch.tsx'
import { Label } from './ui/label.tsx'
import axios from 'axios'

function Navbar() {
    const {user, setUser, setUserField } = useUserStore();
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

    useEffect(()=>{
        const fetchUser = async() =>{
            try
            {
                const response = await axios.post(`http://localhost:5000/api/auth/fetch/${user.userId}`);
                setUserField("email",response.data.email)
                setUserField("phone",response.data.phone)
                setUserField("name",response.data.name)
                setUserField("city",response.data.address.city)
                setUserField("state",response.data.address.state)
            }
            catch(error)
            {
                console.log("Error Occured")
            }
        }
        fetchUser()
    },[user.userId])
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
                    <NavLink to="/contact-us" className={({ isActive }) => `text-lg font-semibold ${isActive ? "text-yellow-500" : ""} flex items-center gap-2`}>
                            Contact Us
                        </NavLink>
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
                        <DropdownMenuItem className='cursor-pointer'>
                            <Link to="/profile">
                                Profile
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => {
                            user.userId ? navigate('/saved-cars') : navigate('/login')
                        }}>Saved Cars</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer md:hidden'>Buy Used Cars</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer md:hidden'>Sell Used Car</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointerc md:hidden'>
                            <Link to='/emi-calculator'>
                                EMI Calculator
                            </Link>
                        </DropdownMenuItem>
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
