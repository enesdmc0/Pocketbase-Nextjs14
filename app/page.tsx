import {pb} from "@/lib/pb";
import {cn} from "@/lib/utils";
import Form from "@/components/form";
import DeleteButton from "@/components/delete-button";
import UpdateButton from "@/components/update-button";
import Realtime from "@/components/realtime";


export const revalidate = 0;
export default async function Home() {

    const todos = await pb.collection('todos').getFullList();
    const notifications = await pb.collection('real_message').getFullList();

  return (
    <section className="p-20 bg-black space-y-10 h-screen">
        <Realtime notifications={notifications} />
        <div className="flex">
            <Form todosLength={todos?.length} />
            <h1 className="flex-1 text-white font-bold  text-2xl flex items-center underline justify-center ">
              POCKETBASE && NEXTJS TODO APP
            </h1>
        </div>
        <div className="flex divide-x-2 divide-blue-500">
            <div className="grid flex-1 pr-5 grid-cols-4 gap-10 ">
                {
                    todos.filter((a:any) => a.isCompleted).map((x: any) => (
                        <div key={x.id}
                             className={cn(" relative border h-fit rounded-md p-5 ", x.isCompleted ? "border-green-500 text-green-500" : "border-red-500 text-red-500")}>
                            <h3 className="underline">{x.todo}</h3>
                            <p>{x.description}</p>
                            <DeleteButton id={x.id}/>
                            <UpdateButton completed={x.isCompleted} id={x.id}/>
                        </div>
                    ))
                }
            </div>
            <div className="grid flex-1 pl-5 grid-cols-4 gap-10 ">
                {
                    todos.filter((a:any) => !a.isCompleted).map((x: any) => (
                        <div key={x.id}
                             className={cn(" relative h-fit border rounded-md p-5 ", x.isCompleted ? "border-green-500 text-green-500" : "border-red-500 text-red-500")}>
                            <h3 className="underline">{x.todo}</h3>
                            <p>{x.description}</p>
                            <DeleteButton id={x.id}/>
                            <UpdateButton completed={x.isCompleted} id={x.id}/>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  );
}
