import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/auth"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const data: any = await register(username, password)

      alert(`Registration successful! Email: ${data.data.email}`)

      navigate("/login")
    } catch (err: any) {
      console.error("Registration error:", err)
      alert("Registration failed. Please try again.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleRegister}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-gray-700">
        Already have an account?{" "}
        <button
          className="text-blue-600 font-semibold hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  )
}
