import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";

const FriendsActivity = () => {
    const { users, fetchUsers } = useChatStore();
    const { user, isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        if (isSignedIn) {
            fetchUsers();
        }
    }, [fetchUsers, isSignedIn]);

    const isPlaying=true;

    if (!isLoaded) {
        return (
            <div className="h-full flex items-center justify-center">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    

    return (
        <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <Users className="size-5 shrink-0" />
                    <h2 className="font-semibold text-white">What they're listening to</h2>
                </div>
            </div>

{!user && <LoginPrompt/>}
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {users.length === 0 ? (
                        <p className="text-zinc-400 text-sm">No users found.</p>
                    ) : (
                        users.map((u) => (
                            <div
                                key={u._id}
                                className="cursor-pointer hover:bg-zinc-800/50 rounded-md p-3 transition-colors group"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="relative">
                                        <Avatar className="size-10 border border-zinc-800">
                                            <AvatarImage src={u.imageUrl} alt={u.fullName} />
                                            <AvatarFallback>{u.fullName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div
                                            className="absolute bottom-0 right-0 w-3 h-3 border-2 border-zinc-900 rounded-full bg-zinc-500"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm text-white">{u.fullName}</span>
                                            {isPlaying && <Music className="size-3.5 text-emerald-400 shrink-0" />}
                                        </div>
                                        {isPlaying ? (
                                        <div className="mt-1">
                                            <div className="text-sm text-white font-medium truncate">Cardigan</div>
                                            <div className="text-xs text-zinc-400 truncate">by Taylor Swift</div>
                                        </div>
                                        ) : (
                                            <div className="mt-1 text-xs text-zinc-400">Idle</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default FriendsActivity;

const LoginPrompt = () => (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="relative">
            <div
                className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse"
                aria-hidden="true"
            />
            <div className="relative bg-zinc-900 rounded-full p-4">
                <HeadphonesIcon className="size-8 text-emerald-400" />
            </div>
        </div>

        <div className="space-y-2 max-w-[250px]">
            <h3 className="text-lg font-semibold text-white">See What Friends Are Playing</h3>
            <p className="text-sm text-zinc-400">Login to discover what music your friends are enjoying right now</p>
        </div>
    </div>
);
