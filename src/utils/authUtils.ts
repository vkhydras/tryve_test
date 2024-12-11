import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    return decoded;
  } catch {
    return null;
  }
}

export function protectedRoute(
  handler: (req: NextRequest, context: unknown) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: unknown) => {
    const user = verifyToken(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req, context);
  };
}
