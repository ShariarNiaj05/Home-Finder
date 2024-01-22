import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageHouses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allHouse, refetch } = useQuery({
    queryKey: ["all-house"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-house");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    axiosPublic.delete(`/delete-house/${id}`).then((res) => {
      if (res?.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Your House has been deleted.", "success");
        refetch();
      }
    });
  };
  return (
    <div>
      <Link to={"/dashboard/add-new-house"}>
        <button className="bg-sky-500 p-3 rounded text-white mb-10">
          Add New House
        </button>
      </Link>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-500 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Bedrooms
              </th>
              <th scope="col" className="px-6 py-3">
                Room Size
              </th>
              <th scope="col" className="px-6 py-3">
                Rent
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allHouse?.map((singleHouse) => (
              <tr
                key={singleHouse._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {singleHouse.name}
                </th>
                <td className="px-6 py-4">{singleHouse.bedrooms}</td>
                <td className="px-6 py-4">{singleHouse.roomSize}</td>
                <td className="px-6 py-4">{singleHouse.rent}</td>
                <td className="px-6 py-4">
                  <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(singleHouse._id)}
                    className=" ml-2 font-medium text-red-600 dark:text-blue-red hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageHouses;
