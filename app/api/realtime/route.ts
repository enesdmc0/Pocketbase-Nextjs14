import {NextRequest, NextResponse} from "next/server";
import {pb} from "@/lib/pb";


export async function POST( req: NextRequest, res:NextResponse) {


   const body = await req.json();
   const {message, is_read, read_date, status} = body;

    const data = {
        message,
        status,
        is_read,
        read_date
    }

    const record = await pb.collection('real_message').create(data);

    return NextResponse.json(record)

}