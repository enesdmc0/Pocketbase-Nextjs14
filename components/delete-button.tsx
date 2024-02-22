"use client"
import React from 'react';
import {pb} from "@/lib/pb";
import {useRouter} from "next/navigation";
interface Props {
    id: string
}

const DeleteButton: React.FC<Props> = ({id}) => {
    const router = useRouter();
    const handleClick = async () => {
         await pb.collection("todos").delete(id);
        router.refresh();
    }

    return (
        <button onClick={handleClick}
            className="absolute top-2 right-2  rounded-md p-1 leading-none border border-inherit hover:opacity-80 transition-all duration-500 ">x</button>

    );
};

export default DeleteButton;
