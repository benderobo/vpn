import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { template, previews, questionnaire } = body;

    const order = await prisma.order.create({
      data: {
        template: template,
        previews: JSON.stringify(previews),
        questionnaire: JSON.stringify(questionnaire),
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
