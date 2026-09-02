import { NextResponse } from "next/server";
import { comparePassword, signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Direct check for admin credentials fallback
    if (email === "admin@moonlitjewel.com" && password === "Admin@123456") {
      const token = signToken({
        userId: "admin-super-id",
        email: "admin@moonlitjewel.com",
        role: "SUPER_ADMIN",
      });

      const response = NextResponse.json({
        success: true,
        user: {
          name: "Moonlit Super Admin",
          email: "admin@moonlitjewel.com",
          role: "SUPER_ADMIN",
        },
      });

      response.cookies.set("moonlit_token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    // DB Lookup
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("moonlit_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Server authentication error" }, { status: 500 });
  }
}
