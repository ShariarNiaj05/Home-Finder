import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllHomeHouse = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allHouse, refetch } = useQuery({
    queryKey: ["all-house"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-house");
      return res.data;
    },
  });
    const handleBookings = (id) => {
        console.log(id);
      
  }
  return (
    <div className=" max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {allHouse?.map((house) => (
        <div
          key={house._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img className="rounded-t-lg" src={house.picture} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {house.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {house.description}
            </p>
                  <button 
                      onClick={() => handleBookings(house._id)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllHomeHouse;
