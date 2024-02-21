import {NextRequest, NextResponse} from "next/server";
import {pb} from "@/lib/pb";


export async function POST( req: NextRequest, res:NextResponse) {



   const body = await req.json();
   const {message, is_read, read_date} = body;



    const data = {
        message,
        is_read,
        read_date
    }

    const record = await pb.collection('real_message').create(data);

}