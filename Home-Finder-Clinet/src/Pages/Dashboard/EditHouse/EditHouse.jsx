import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const EditHouse = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data: singleHouse } = useQuery({
    queryKey: ["all-house"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/single-house/${id}`);
      return res.data;
    },
  });

  const {
    _id,
    name,
    address,
    city,
    bedrooms,
    bathrooms,
    roomSize,
    picture,
    availabilityDate,
    rent,
    phoneNumber,
    description,
  } = singleHouse;

  const handleEditHouse = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const address = form.get("address");
    const city = form.get("city");
    const bedrooms = form.get("bedrooms");
    const bathrooms = form.get("bathrooms");
    const roomSize = form.get("roomSize");
    const picture = form.get("picture");
    const availabilityDate = form.get("availabilityDate");
    const rent = form.get("rent");
    const phoneNumber = form.get("phoneNumber");
    const description = form.get("description");

    const newHouse = {
      name,
      address,
      city,
      bedrooms,
      bathrooms,
      roomSize,
      picture,
      availabilityDate,
      rent,
      phoneNumber,
      description,
    };

    axiosPublic.put(`/update-house/${_id}`, newHouse).then((res) => {
      console.log(res);
      if (res?.data.modifiedCount > 0) {
        Swal.fire("Success", "House Updated Successfully", "success");
      }
    });
    console.log(newHouse);
  };

  return (
    <div>
      EditHouse
      <div>
        <div className="  max-w-7xl mx-auto">
          <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div>
                <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-400">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Add Your New House in the Listing
                  </h2>
                  <form onSubmit={handleEditHouse} className="mt-8 space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="name"
                        // ref={name}
                        name="name"
                        id="name"
                        className={inputStyle}
                        placeholder="Your Name"
                        defaultValue={name}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        // ref={email}
                        name="address"
                        id="address"
                        className={inputStyle}
                        placeholder="Kushumbag"
                        defaultValue={address}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        // ref={password}
                        id="city"
                        placeholder="Chittagong"
                        defaultValue={city}
                        className={inputStyle}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="bedrooms"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Bedrooms
                      </label>
                      <input
                        type="number"
                        name="bedrooms"
                        // ref={phoneNumber}
                        id="bedrooms"
                        placeholder="3"
                        className={inputStyle}
                        defaultValue={bedrooms}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bathrooms"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of bathrooms
                      </label>
                      <input
                        type="number"
                        name="bathrooms"
                        // ref={phoneNumber}
                        defaultValue={bathrooms}
                        id="bedrooms"
                        placeholder="3"
                        className={inputStyle}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="bathrooms"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Room Size
                      </label>
                      <input
                        type="number"
                        name="roomSize"
                        // ref={phoneNumber}
                        id="bedrooms"
                        placeholder="1200 sq ft"
                        className={inputStyle}
                        defaultValue={roomSize}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="picture"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Picture url
                      </label>
                      <input
                        type="url"
                        name="picture"
                        // ref={phoneNumber}
                        id="picture"
                        placeholder="picture url"
                        className={inputStyle}
                        defaultValue={picture}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="availabilityDate"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Availability Date
                      </label>
                      <input
                        type="date"
                        name="availabilityDate"
                        // ref={phoneNumber}
                        id="availabilityDate"
                        placeholder="picture url"
                        className={inputStyle}
                        defaultValue={availabilityDate}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="availabilityDate"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Rent Per Month
                      </label>
                      <input
                        type="number"
                        name="rent"
                        // ref={phoneNumber}
                        id="rent"
                        placeholder="Rent Per Month"
                        className={inputStyle}
                        defaultValue={rent}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        // ref={phoneNumber}
                        id="phoneNumber"
                        placeholder="Phone"
                        className={inputStyle}
                        defaultValue={phoneNumber}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="description"
                        // ref={phoneNumber}
                        id="description"
                        placeholder="Description"
                        className={inputStyle}
                        defaultValue={description}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className={
                        "w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      }
                    >
                      Update House
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const inputStyle =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default EditHouse;
