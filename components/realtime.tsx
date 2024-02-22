"use client"
import React, {useEffect, useState} from 'react';
import {pb} from "@/lib/pb";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
interface Props {
    notifications: any

}


const Realtime: React.FC<Props> = ({notifications}) => {
    const [messages, setMessages] = useState(null)
    const [selectedTab, setSelectedTab] = useState("unread")
    const [isModal, setIsModal] = useState(false)
    const router = useRouter()


    useEffect(() => {
        pb.collection('todos').subscribe('*', async (data: any) => {
            setMessages(data)
            console.log(data, "---data---");
            await fetch("/api/realtime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "message": data.action === "create" ? "new todo created" : data.action === "delete" ? "todo deleted" : "todo updated",
                    "status": data.action,
                    "is_read": false,
                    "read_date": null
                })

            })
        } );
    }, [messages])

    const handleModal = () => {
        setIsModal(!isModal)
        setMessages(null)
    }

    const handleSet = async (id: string, read: boolean) => {
        await pb.collection('real_message').update(id, {is_read: !read, read_date: new Date()});
        router.refresh()
    }

const handleDelete = async (id: string) => {
        await pb.collection('real_message').delete(id);
        router.refresh()
    }

    return (
        <div className="p-5 bg-gray-900 rounded-md text-white w-full flex items-center justify-between relative">
            <h1>TODO APP</h1>
            <div className="relative">
                <button onClick={handleModal} className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center ">ED</button>
                {messages && <span
                    className="absolute w-5 h-5 bg-pink-900 rounded-full flex items-center justify-center -top-2 -right-2 text-sm font-bold">1</span>}
            </div>

            <div
                className={cn("w-[450px] h-[500px] bg-gray-500 border rounded-md top-20 right-0 p-4 gap-2 flex flex-col z-50", isModal ? "absolute" : "hidden" )}>

                <div className="flex gap-2 border-b pb-2">
                    <button onClick={() => setSelectedTab("read")} className={cn("flex-1 bg-green-500 rounded-md py-2", selectedTab === "read" ? "" : "opacity-50" )}>read</button>
                    <button onClick={() => setSelectedTab("unread")} className={cn("flex-1 bg-red-500 rounded-md py-2", selectedTab === "unread" ? "" : "opacity-50" )}>unread</button>
                </div>

                {
                    notifications.filter((x:any) => selectedTab === "read" ? x.is_read : !x.is_read).map((x: any) => (
                        <div key={x.id} className={cn("flex items-center justify-between  p-2 border rounded-lg")}>
                            <p className={cn("text-sm font-semibold")}>{x.message}</p>
                            <div
                                className={cn("rounded-full py-1 px-2", x.status === "create" ? "bg-green-500" : x.status === "delete" ? "bg-red-500" : "bg-blue-500")}>
                                <p className="text-xs font-semibold">{x.status}</p>
                            </div>
                            { selectedTab === "read" && <div
                                className={cn("rounded-full py-1 px-2", x.status === "create" ? "bg-green-500" : x.status === "delete" ? "bg-red-500" : "bg-blue-500")}>
                                <p className="text-xs font-semibold">{(x.read_date).toString().split(".")[0]}</p>
                            </div>}
                            <div className="flex items-center gap-3">
                                <button onClick={() => handleDelete(x.id)}
                                        className="w-6 h-6 rounded-lg bg-red-500 hover:opacity-50 transition-all duration-500">x
                                </button>
                                <button onClick={() => handleSet(x.id, x.is_read)}
                                        className="w-6 h-6 rounded-lg bg-green-500 hover:opacity-50 transition-all duration-500">y
                                </button>
                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default Realtime;
