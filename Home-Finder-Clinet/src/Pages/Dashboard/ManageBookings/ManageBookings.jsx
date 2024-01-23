import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosPublic = useAxiosPublic();

  const { data: bookings, refetch } = useQuery({
    queryKey: ["all-house"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-bookings");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    axiosPublic.delete(`/delete-booking/${id}`).then((res) => {
      if (res?.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Your booking has been deleted.", "success");
        refetch();
      }
    });
  };

  return (
    <div>
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
            {bookings?.map((booking) => (
              <tr
                key={booking._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {booking.name}
                </th>
                <td className="px-6 py-4">{booking.bedrooms}</td>
                <td className="px-6 py-4">{booking.roomSize}</td>
                <td className="px-6 py-4">{booking.rent}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(booking._id)}
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

export default ManageBookings;
