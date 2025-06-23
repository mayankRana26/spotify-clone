import { axiosIntance } from "@/lib/axios"
import { useAuth } from "@clerk/clerk-react"

import { Loader } from "lucide-react"

import { useEffect, useState } from "react"


const updateApiToken = (token: string | null) => {
   if(token) axiosIntance.defaults.headers.common['Authorization'] = `Bearer ${token}`
   else delete axiosIntance.defaults.headers.common['Authorization'];
   
}

const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken()
                
                updateApiToken(token)
            } catch (error) {
                updateApiToken(null)
                console.log("Erroe in Auth Provider", error);
            }finally{
                setLoading(false)
            }
        };
        initAuth()
    }, [getToken])
    if(loading) return (
        <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-20 text-emerald-500 animate-spin"/>
        </div>
    )
    return (
        <>{children}</>
    )
}

export default AuthProvider