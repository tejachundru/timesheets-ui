import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignInMutation } from "@/services/auth";
import { setLoginDetails, type IUserState } from "@/store/slice/user.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const response = await signIn(data);

    if ("error" in response) {
      const error = response.error as { data: { message: string } };
      toast.error(`Error: ${error?.data?.message}`);
      return;
    }

    if ("data" in response) {
      toast.success("Login successful");
      const payload: IUserState = {
        fullname: response.data.fullname,
        email: response.data.email,
        uid: response.data.user.uid,
        accessToken: response.data.accessToken,
        expiresIn: response.data.expiresIn,
        tokenType: response.data.tokenType,
        isAuthenticated: true,
      };
      dispatch(setLoginDetails(payload));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center flex-col gap-6">
      <img alt="Logo" className="w-1/6" src="/logo.png" />
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t("auth.login")}</CardTitle>
          <CardDescription>{t("auth.details")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <FormLabel htmlFor="email">{t("auth.email")}</FormLabel>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          required
                          id="email"
                          placeholder="m@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormLabel htmlFor="password">{t("auth.password")}</FormLabel>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          required
                          id="password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full" loading={isLoading} type="submit">
                {t("auth.login")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
