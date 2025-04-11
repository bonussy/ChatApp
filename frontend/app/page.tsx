"use client";

import { Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Welcome to ChatApp</h1>
      <Card 
        className="shadow-md p-6 text-center"
        sx={{
          backgroundColor: "lightyellow", // Override background color
          borderRadius: "16px", // Add rounded corners
        }}
      >
        <h2 className="text-lg font-bold mb-4">Navigate to:</h2>
        <div className="flex flex-col gap-4">
          <Button
            variant="contained"
            color="success"
            onClick={() => router.push("/chat")}
          >
            Chat
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
}
