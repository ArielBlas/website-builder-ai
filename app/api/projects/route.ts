import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { projectId, frameId, messages } = await req.json();
  const user = await currentUser();
  // Create Project
  const projectResult = await db.insert(projectTable).values({
    projectId: projectId,
    createdBy: user?.emailAddresses[0]?.emailAddress || "",
  });
  // Create Frame
  const frameResult = await db.insert(frameTable).values({
    frameId: frameId,
    projectId: projectId,
  });
  // Save user Msg
  const chatResult = await db.insert(chatTable).values({
    chatMessage: messages,
    createdBy: user?.emailAddresses[0]?.emailAddress || "",
    frameId: frameId,
  });

  return NextResponse.json({ projectId, frameId, messages });
}
