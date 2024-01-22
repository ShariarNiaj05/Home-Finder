import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const DashboardSidebar = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <div className=" flex flex-col justify-between items-stretch bg-slate-200">
        <div className=" hidden md:flex md:flex-col justify-between items-center h-screen">
          <div className=" hidden md:flex h-2/3">
            <ul className=" px-1 flex flex-col items-center">
              {houseOwnerNavItem}

              
              {houseRenterNavItem}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center mx-auto ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          ></div>
        </div>
      </div>
    </div>
  );
};
const activeLinkStyle = ({ isActive, isPending }) =>
  isPending
    ? "pending"
    : isActive
    ? "bg-[#33547D] text-white rounded p-2"
    : " hover:bg-teal-600 hover:text-white rounded p-2";

const houseOwnerNavItem = (
  <>
    <NavLink to={"/dashboard/manage-house"} className={activeLinkStyle}>
      Manage House
    </NavLink>
  </>
);
const houseRenterNavItem = (
  <>
    <NavLink to={"/dashboard/manage-booking"} className={activeLinkStyle}>
      Manage Booking
    </NavLink>
  </>
);

export default DashboardSidebar;
