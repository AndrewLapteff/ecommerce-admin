import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    console.log(req)
    console.log()
    const { user } = auth()
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log('[STORE_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}