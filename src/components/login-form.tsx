"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
            Login to your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email below to login
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">
              Password
            </FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
          />
        </Field>

        <Field>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Field>
        {/* <FieldSeparator>
          Or continue with
        </FieldSeparator> */}

        <Field>
          

          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>

      </FieldGroup>
    </form>
  )
}


// "use client"

// import { useRouter } from "next/navigation"
// import { useState } from "react"

// export function LoginForm() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setLoading(true)

//     const formData = new FormData(e.currentTarget)

//     const res = await fetch("/api/login", {
//       method: "POST",
//       body: JSON.stringify({
//         email: formData.get("email"),
//         password: formData.get("password"),
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })

//     const data = await res.json()

//     if (data.success) {
//       localStorage.setItem("token", data.token)
//       router.push("/dashboard")
//     } else {
//       alert("Invalid email or password")
//     }

//     setLoading(false)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//       {/* your fields */}

//       <button
//         type="submit"
//         className="bg-black text-white py-2 rounded-lg"
//         disabled={loading}
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   )
// }