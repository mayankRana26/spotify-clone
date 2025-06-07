import { Card, CardContent } from "@/components/ui/card"
import { axiosIntance } from "@/lib/axios"
import { useUser } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser()
  const navigate = useNavigate()
  const syncAttempt =useRef(false)
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempt.current) return;
      try {
        syncAttempt.current=true;
        
        await axiosIntance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        })
      } catch (error) {
        console.log("Error in syncing user", error);
        
      }finally{
        navigate("/")
      }
    }
    syncUser()
  }, [isLoaded, user, navigate])
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w=[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6 ">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-lg font-bold text-zinc-400"> Logging You In</h3>
          <p className="text-sm text-zinc-400">Please Wait....</p>
        </CardContent>

      </Card>

    </div>
  )
}

export default AuthCallbackPage