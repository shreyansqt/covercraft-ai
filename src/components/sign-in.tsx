import { signIn } from "@/auth";
import { Button, type ButtonProps } from "./ui/button";

export function SignIn({ children, ...restProps }: ButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/app" });
      }}
    >
      <Button type="submit" {...restProps}>
        {children ?? "Sign in with Google"}
      </Button>
    </form>
  );
}
