import { Link } from "react-router-dom";

const ManageHouses = () => {
  return (
    <div>
      house owner manage houses
      <Link to={"/dashboard/add-new-house"}>
        <button className="bg-sky-500 p-3 rounded text-white">
          Add New House
        </button>
      </Link>
    </div>
  );
};

export default ManageHouses;
