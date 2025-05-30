import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (response: any) => {
    console.log("Response from Google:", response);
    const loginResponse = await login(response);
    console.log("Response from server:", loginResponse);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">GoodEx Admin</CardTitle>
          <CardDescription>
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
         <div className="flex flex-col gap-3">
            <GoogleLogin text="continue_with" onSuccess={handleLogin} />
          </div>
      </Card>
    </div>
  );
};

export default Login;
