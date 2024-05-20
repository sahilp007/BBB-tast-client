import Image from "next/image";
import AuthForm from "@/components/auth-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <AuthForm isLogin={false} />
    </main>
  );
}
