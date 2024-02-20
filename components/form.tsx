"use client"
import React, {useState}  from 'react';
import {pb} from "@/lib/pb";
import {useRouter} from "next/navigation";
interface Props {
    todosLength: number;

}

const Form:React.FC<Props> = ({todosLength}) => {
    const [input, setInput] = useState('');
    const router= useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodo = await pb.collection("todos").create({
            "todo": todosLength + 1,
            "isCompleted": false,
            "description": input
        })
        console.log(newTodo, "---newtodo---");
        setInput('');
        router.refresh()
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-1 gap-5">
            <input value={input}
            onChange={(e) => setInput(e.target.value)}
                placeholder="add todo..."
                   className="grow outline-none bg-transparent text-white px-3 rounded-md border border-blue-500"
                   type="text"/>
            <button type="submit"
                    className="border border-blue-500 text-blue-500 rounded-md px-3 py-2 hover:bg-blue-500 hover:text-black transition-all duration-500">create
            </button>
        </form>
    );
};

export default Form;
