import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
     <div>
        <div className=" hidden md:block">
        {/* <Navbar></Navbar> */}
        </div>
        <div className=" flex flex-col md:flex-row gap-10 w-full p-10">
      <div className=" md:w-64">
        <DashboardSidebar></DashboardSidebar>
      </div>
      <div className=" flex-1">
        <Outlet></Outlet>
      </div>
    </div>
    </div>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  props: PropTypes.any,
};
