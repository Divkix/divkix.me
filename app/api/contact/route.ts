import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // Log to console (as per spec - no external service)
    console.log("=== Contact Form Submission ===")
    console.log("Name:", data.name)
    console.log("Email:", data.email)
    console.log("Message:", data.message)
    console.log("Timestamp:", new Date().toISOString())
    console.log("==============================")

    return NextResponse.json(
      { success: true, message: "Message received" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
