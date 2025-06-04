import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserAuth } from "@/context/userAuthContext";
import type { UserLogIn } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const initialValue: UserLogIn = {
  email: "",
  password: "",
};

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const { googleSignIn, logIn } = useUserAuth();
  const navigate = useNavigate();
  const [userLogInInfo, setUserLogInInfo] =
    React.useState<UserLogIn>(initialValue);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("The user info is: ", userLogInInfo);
      await logIn(userLogInInfo.email, userLogInInfo.password);
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      {/* <div>Login</div> */}
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Log In</CardTitle>
            <CardDescription>
              Enter your email below to log in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols">
              <Button variant="outline" onClick={handleGoogleSignIn}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={userLogInInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserLogInInfo({ ...userLogInInfo, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2 mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={userLogInInfo.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserLogInInfo({
                    ...userLogInInfo,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Login
            </Button>
          </CardFooter>
          <p className="mt-3 text-sm text-center">
            Don't have an account ?
            <Link
              to="/signup"
              className="bg-gray-700 p-1 text-white text-center rounded-sm"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </Card>
    </>
  );
};

export default Login;
