import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
};
