import LoginForm from "./LoginForm";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { registered } = await searchParams;

  return (
    <section className="mx-auto w-full max-w-md py-12">
      <h1 className="mb-6 text-4xl">Log in</h1>
      {registered === "true" && (
        <p role="status" className="border-sage mb-6 rounded-xl border bg-white p-4 text-sm">
          Account created! You can now log in.
        </p>
      )}
      <LoginForm />
    </section>
  );
}
