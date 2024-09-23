import { useForm } from "react-hook-form";
import { AuthScreen } from "../../../utils/enums/auth.enum";
import { ILoginFormInputs } from "@/utils/interfaces/auth.interface";

interface IProps {
  setAuthScreen: (value: AuthScreen) => void;
}

const Login = ({ setAuthScreen }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>();

  const onSubmit = (data: ILoginFormInputs) => {
    console.log(data);
    // Handle form submission logic (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white  rounded-lg  max-w-md w-full">
        <h2 className="text-2xl font-bold text-center ">Login</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => setAuthScreen(AuthScreen.REGISTER)}
            className="text-blue-500 hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
