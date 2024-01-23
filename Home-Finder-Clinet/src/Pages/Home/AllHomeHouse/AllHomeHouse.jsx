import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";

const AllHomeHouse = () => {
    const [filters, setFilters] = useState({
        city: "",
        bedrooms: "",
        bathrooms: "",
        roomSize: "",
        minRent: "",
        maxRent: "",
    });
    
  const axiosPublic = useAxiosPublic();

  const { data: allHouse, refetch } = useQuery({
    queryKey: ["all-house"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-house");
      return res.data;
    },
  });
  const handleBookings = (id) => {
      const houseInfo = allHouse.find((house) => house._id === id);
      
      const newBooking = {
          name: houseInfo.name,
          address: houseInfo.address ,
          city: houseInfo.city,
          bedrooms: houseInfo.bedrooms,
          bathrooms: houseInfo.bathrooms,
          roomSize: houseInfo.roomSize,
          picture: houseInfo.picture,
          availabilityDate: houseInfo.availabilityDate,
          rent: houseInfo.rent,
          phoneNumber: houseInfo.phoneNumber,
          description: houseInfo.description
      }

    axiosPublic.post("/booking-house", newBooking).then((res) => {
      if (res?.data.insertedId) {
        Swal.fire("Success", "House Booked Successfully", "success");
      }
    });
    };
    
    const handleSearch = () => {
        refetch({
          queryKey: ["all-house"],
          queryFn: async () => {
            const res = await axiosPublic.get("/all-house", { params: filters });
            return res.data;
          },
        });
      };
  return (
    <div>
      <h2 className=" text-center mb-2 text-2xl font-bold text-sky-600">
        See All the listed House
          </h2>
          <div className="mb-3 flex space-x-2">
        <input
          type="text"
          placeholder="Search by city"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
        {/* Add other input fields for bedrooms, bathrooms, roomSize, minRent, maxRent */}
        <button
          onClick={handleSearch}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
        >
          Search
        </button>
      </div>
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
    </div>
  );
};

export default AllHomeHouse;