"use client"
import React, {useState, useEffect} from 'react';
import PocketBase from 'pocketbase';
import {cn} from "@/lib/utils";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
const Chat = () => {
    const [messages, setMessages] = useState<any>([]);
    const [message, setMessage] = useState<any>('');
    const [name, setName] = useState<any>('');

useEffect(() => {


    pb.collection("chat").subscribe("*",(enes) => {
        setMessages([...messages, enes])
    });

}, [messages])


const handleSubmit = async (e:any) => {
    e.preventDefault();
    await pb.collection("chat").create({message, name: name});
    setMessage('');
}
console.log(messages,"----")

    return (
        <div className="h-screen w-screen bg-black text-white p-20">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input type="text" className="text-black" value={message} onChange={(e: any) => setMessage(e.target.value)}/>
                                <input value={name} className="text-black" onChange={(e: any) => setName(e.target.value)} type="text"/>
                                <button type="submit">Send</button>
                            </form>
                            <div className="w-[400px] h-[600px] border mt-20 p-5">

                                {
                                    messages.map((message:any, index:any) => (
                                        <div key={index} className={cn("p-2 border-b flex ", message.record.name === "enes" ? "justify-start bg-red-400" : "justify-end bg-green-500" )}>{message.record.message}</div>
                                    ))
                                }
                            </div>
                        </div>
        </div>
    );
};

export default Chat;
