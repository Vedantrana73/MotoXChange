import { Button } from '../components/ui/button.tsx'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar.tsx'
import { MapPin} from 'lucide-react'
function Profile() {
  return (
    <div className='min-w-screen space-y-10 md:px-4 px-1.5'>
      <div className='w-full md:shadow-lg min-h-50 rounded-lg p-2 md:p-6'>
        <div className='flex flex-col md:flex-row md:items-center gap-7'>

      <Avatar className='h-20 w-20'>
            <AvatarImage src='https://github.com/shadcn.png' alt='profile image' />
            <AvatarFallback className='font-semibold bg-blue-500 text-white'>AG</AvatarFallback>
        </Avatar>
        <div className='text-xl md:text-2xl font-semibold space-y-2'>
            <div>
                Name: Akshat Gohil
            </div>
            <div>
                Email: g48akshatgohilfyjc@gmail.com
            </div>
            <div className='flex gap-2 md:gap-4 items-center'>
                <div>
                Phone: 1234567890
                </div>
                <div>
                    <Button className='px-5 py-1'>Edit</Button>
                </div>
            </div>
        </div>
        </div>
      </div>
      <div className='flex items-center gap-1 md:gap-4 shadow-lg md:p-3'>
        
      <MapPin size={30} />
        <div className='text-lg font-bold'>
            Mumbai, Maharashtra
        </div>
        <div>
            <Button>Change Location</Button>
        </div>
      </div>
      <div className='md:shadow-lg md:p-3'>
        <Button className='text-sm md:text-lg p-3 md:p-5'>Logout</Button>
      </div>
    </div>
  )
}

export default Profile
