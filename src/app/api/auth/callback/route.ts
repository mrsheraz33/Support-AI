import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {searchParams} = new URL(req.url)
    const code = searchParams.get("code")
     const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

    if(!code){
        return NextResponse.json({message: "code not found!"}, {status:404})
    }

    const session = await scalekit.authenticateWithCode(code, redirectUrl)
    console.log(session)
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)

  response.cookies.set("access_token", session.accessToken, {
    httpOnly: true,
    secure:process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path:"/",
    sameSite: "lax"
  });

  return response
}