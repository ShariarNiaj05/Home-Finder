import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" w-full flex justify-between p-5 border-2">
      <div className=" font-bold text-sky-500 text-2xl">House Finder</div>
      <div className=" bg-sky-600 rounded p-3 text-white">
        <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
