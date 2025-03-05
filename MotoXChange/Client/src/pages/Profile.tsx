import { Button } from '../components/ui/button.tsx'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar.tsx'
import { MapPin} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { Skeleton } from '../components/ui/skeleton.tsx'

function Profile() {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchUser = async () => {
          try {
              const userId = localStorage.getItem("userId");
              if (!userId) {
                  toast.warning("User ID not found. Login Again!!");
                  setLoading(false);
                  return;
              }

              const response = await axios.post(`http://localhost:5000/api/auth/fetch/${userId}`);
              setUser(response.data);
          } catch (error) {
              toast.error("Failed to fetch user details. Please try again.");
          } finally {
              setLoading(false);
          }
      };

      fetchUser();
  }, []);
  return (
    <div className="min-w-screen space-y-10 md:px-4 px-1.5">
    {/* Profile Card */}
    <div className="w-full md:shadow-lg min-h-50 rounded-lg p-2 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-7">
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" alt="profile image" />
                <AvatarFallback className="font-semibold bg-blue-500 text-white">
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                </AvatarFallback>
            </Avatar>

            {loading ? (
                <Skeleton className="h-20 w-full rounded-lg" />
            ) : (
                <div className="text-xl md:text-2xl font-semibold space-y-2">
                    <div>Name: {user?.name || "N/A"}</div>
                    <div>Email: {user?.email || "N/A"}</div>
                    <div className="flex gap-2 md:gap-4 items-center">
                        <div>Phone: {user?.phone || "N/A"}</div>
                        <Button className="px-5 py-1">Edit</Button>
                    </div>
                </div>
            )}
        </div>
    </div>

    {/* Location */}
    <div className="flex items-center gap-1 md:gap-4 shadow-lg md:p-3">
        <MapPin size={30} />
        {loading ? (
            <Skeleton className="h-6 w-40 rounded-lg" />
        ) : (
            <div className="text-lg font-bold">
                {user?.address?.city || "N/A"}, {user?.address?.state || "N/A"}
            </div>
        )}
        <Button>Change Location</Button>
    </div>

    {/* Logout Button */}
    <div className="md:shadow-lg md:p-3">
        <Button className="text-sm md:text-lg p-3 md:p-5">Logout</Button>
    </div>
</div>  )
}

export default Profile
