import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  /* const name = useRef();
  const email = useRef();
  const password = useRef();
  const role = useRef();
  const phoneNumber = useRef(); */
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const name = form.get("name");
    const password = form.get("password");
    const role = form.get("role");
    const phoneNumber = form.get("phoneNumber");

    const newUser = {
      userEmail: email,
      userName: name,
      userPassword: password,
      userRole: role,
      userPhoneNumber: phoneNumber,
    };

    console.log(newUser);
      const userInfo = await createUser(newUser, email);
      console.log(userInfo);
    if (role === "houseOwner") {
      navigate("/dashboard/manage-house");
    }
    if (role === "houseRenter") {
      navigate("/dashboard/manage-booking");
    }
  };
  return (
    <div className="  max-w-7xl mx-auto">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign in to Home Finder
              </h2>
              <form onSubmit={handleRegister} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="name"
                    // ref={name}
                    name="name"
                    id="name"
                    className={inputStyle}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    // ref={email}
                    name="email"
                    id="email"
                    className={inputStyle}
                    placeholder="name@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    // ref={password}
                    id="password"
                    placeholder="••••••••"
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a role
                  </label>

                  <select
                    name="role"
                    type="select"
                    // ref={role}
                    id="role"
                    placeholder="••••••••"
                    className={inputStyle}
                    required
                  >
                    <option value="houseOwner">House Owner</option>
                    <option value="houseRenter">House Renter</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Phone Number
                  </label>
                  <input
                    type=""
                    name="phoneNumber"
                    // ref={phoneNumber}
                    id="phoneNumber"
                    placeholder="018......."
                    className={inputStyle}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={
                    "w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  }
                >
                  Register New Account
                </button>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Already have account?{" "}
                  <Link
                    to={"/login"}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const inputStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default Register;
