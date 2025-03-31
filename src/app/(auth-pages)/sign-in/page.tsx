import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { sanityFetch } from "@/lib/queries";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
  async function signIn(formData: FormData) {
    "use server";
    const nome = formData.get("nome");
    const password = formData.get("password");

    const users = await sanityFetch({
      query: '*[_type == "admin"]{nome, password}',
      revalidate: 30,
    });

    const user = users.find(
      (user: any) => user.nome === nome && user.password === password
    );

    if (user) {
      // Store user data in a cookie
      const cookieStore = await cookies();
      cookieStore.set("user", JSON.stringify(user), {
        httpOnly: true, // Secure the cookie
        path: "/", // Make it available across the app
        maxAge: 60 * 60, // 1 hour
      });

      redirect("/upload");
    }
  }

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 text-text">
      <div className="container flex justify-center w-full">
        <form className="flex flex-col min-w-64" action={signIn}>
          <h1 className="text-2xl font-medium">Sign in</h1>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label>Nome</Label>
            <Input name="nome" required />
            <div className="flex justify-between items-center">
              <Label>Password</Label>
            </div>
            <Input type="password" name="password" required />
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
