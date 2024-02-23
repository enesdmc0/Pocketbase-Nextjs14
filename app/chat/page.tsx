"use client";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import { cn } from "@/lib/utils";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
const Chat = () => {
    const [messages, setMessages] = useState<any>([]);
    const [message, setMessage] = useState<any>("");
    const [name, setName] = useState<any>("");
    const [openPhone, setOpenPhone] = useState<any>(false);

    useEffect(() => {
        pb.collection("chat").subscribe("*", (enes) => {
            setMessages([...messages, enes]);
        });
    }, [messages]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await pb.collection("chat").create({ message, name: name });
        setMessage("");
    };
    console.log(messages, "----");

    return (
        <div className="h-screen w-screen bg-black text-white p-20 flex items-center justify-center">
            <div className="w-[400px] h-[600px] overflow-y-auto flex gap-5 flex-col border mt-20 p-5 rounded-lg">
                {
                    openPhone ? (
                        <>
                            <div className="flex-1 border rounded-lg">
                                {messages.map((message: any, index: any) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "p-2 flex items-center gap-2",
                                            message.record.name === "A"
                                                ? ""
                                                : "  flex-row-reverse"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center text-xs",
                                                message.record.name === "A" ? "bg-blue-900" : "bg-green-900"
                                            )}
                                        >
                                            {message.record.name}
                                        </div>

                                        {message.record.message}
                                    </div>
                                ))}
                            </div>
                            <form className="gap-3 flex sticky bottom-0 bg-black" onSubmit={handleSubmit}>
                                <div className="rounded-lg flex items-center gap-2 text-xs">
                                    <span onClick={() => setName("A")}
                                          className={cn("cursor-pointer border rounded-md p-1", name === "A" ? "bg-blue-500" : "")}>A</span>
                                    <span onClick={() => setName("B")}
                                          className={cn("cursor-pointer border rounded-md p-1", name === "B" ? "bg-green-500" : "")}>B</span>
                                </div>
                                <input
                                    type="text"
                                    className="bg-transparent  border rounded-lg grow p-1"
                                    value={message}
                                    onChange={(e: any) => setMessage(e.target.value)}
                                />
                                <button type="submit" className="text-sm py-1 px-2 rounded-lg border">
                                    Send
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex justify-between flex-col items-center p-5 h-full">
                            <div className="w-20 h-3 rounded-full border "></div>

                            { messages.length > 0 && <div className="w-full gap-2 h-12 rounded-lg flex items-center px-3 border">
                                <div className="w-8 h-8 rounded-full border flex items-center justify-center">E</div>
                                <p>hello</p>
                            </div>}


                            <div onClick={() => setOpenPhone(!openPhone)} className="w-10 h-10 rounded-full border flex items-center justify-center">
                                <div className="w-4 h-4 border rounded-md"></div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Chat;