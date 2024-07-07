import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu,refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleted = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res.data.deletedCount > 0) {
          refetch(); 
          Swal.fire({
            title: "Deleted!",
            text: `${item.name} has been deleted from menu items`,
            icon: "success"
          });
        }
      }
    });
  };

  return (
    <div>
      <SectionTitle header="MANAGE ALL" subheader="HURRY UP" />
      <div className="overflow-x-auto">
        <table className="table text-xl">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td className="text-2xl">${item.price}</td>
                <td>
                  <Link to={`/dashboard/updateItems/${item._id}`}>
                    <button className="btn btn-ghost btn-xs">
                      <FaEdit className="text-2xl" />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleted(item._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrashAlt className="text-2xl" />
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

export default ManageItems;
