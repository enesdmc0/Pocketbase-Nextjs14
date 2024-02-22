"use client"
import React from 'react';
import {pb} from "@/lib/pb";
import {useRouter} from "next/navigation";
interface Props {
    id: string
    completed: boolean
}

const UpdateButton: React.FC<Props> = ({id, completed}) => {
    const router = useRouter();
    const handleUpdate = async () => {
        await pb.collection("todos").update(id, {"isCompleted": !completed});
        router.refresh();

    }

    return (
        <button onClick={handleUpdate} title="Update"
                className="absolute top-2 right-8  rounded-md p-1 leading-none border border-inherit hover:opacity-80 transition-all duration-500 ">Q</button>

    );
};

export default UpdateButton;
