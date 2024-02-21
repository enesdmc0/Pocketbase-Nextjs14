"use client"
import React, {useState , useEffect} from 'react';
import {pb} from "@/lib/pb";

const Navbar = () => {
    const [messages, setMessages] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        pb.collection('todos').subscribe('*', function (e:any) {
            setMessages(e)
            console.log(e,"-----realtime---")
        })
    }, [])

    return (
        <div className="rounded-md p-5 bg-black flex items-center justify-between relative">
            <p className="font-bold text-lg">chat app</p>
            <div className="relative">
                <span className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center  ">ED</span>
                <span className="rounded-full w-6 h-6 flex items-center justify-center bg-pink-800 p-1 text-sm absolute -top-2 -right-2">1</span>
            </div>
            <div className="absolute w-[500px] h-[700px] bg-gray-500 border rounded-md top-20 right-0 p-1 flex flex-col">

                <div className="flex flex-1 ">d</div>
                <div className="flex ">
                    <input type="text" className="outline-none bg-transparent p-2 flex grow border rounded-md"/>
                    <button className="p-2 rounded-md bg-blue-500">send</button>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
