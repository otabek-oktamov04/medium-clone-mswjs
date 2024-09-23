import { Button } from "@/components/ui/button";
import { useRegister } from "@/react-query/hooks";
import { AuthScreen } from "@/utils/enums/auth.enum";
import { IRegisterFormInputs } from "@/utils/interfaces/auth.interface";
import { useForm } from "react-hook-form";

interface IProps {
  setAuthScreen: (value: AuthScreen) => void;
}

const Register = ({ setAuthScreen }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInputs>();
  const { mutate, isPending, error } = useRegister();

  const onSubmit = (data: IRegisterFormInputs) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white  rounded-lg  max-w-md w-full">
        <h2 className="text-2xl font-bold text-center ">Register</h2>
        <p className="text-center text-gray-600 ">Create a new account</p>
        {error && (
          <p className="text-center text-red-600 mb-6">{error.message}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
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

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              First Name
            </label>
            <input
              {...register("firstName", { required: "First Name is required" })}
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              type="email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="h-12 w-full text-md"
          >
            {isPending ? "Submitting..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => setAuthScreen(AuthScreen.LOGIN)}
            className="text-blue-500 hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
