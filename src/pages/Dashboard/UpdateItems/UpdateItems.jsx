import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItems = () => {
    const item = useLoaderData(); 
    const { _id, price, name, category, recipe } = item;

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: name,
            category: category,
            price: price,
            recipe: recipe,
            description: recipe, 
        }
    });
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log("Submitted Data: ", data);
        const imageFile = { image: data.image[0] };

        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                console.log("Image uploaded successfully: ", res.data.data.display_url);
                // Now send the menu items data to the server with the image URL
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: data.price,
                    recipe: data.recipe,
                    image: res.data.data.display_url,
                };

                const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
                console.log("Menu update response: ", menuRes.data);

                if (menuRes.data.modifiedCount > 0) {
                    reset();

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} updated in the Menu Items`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "No changes were made to the item",
                        showConfirmButton: true,
                    });
                }
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.error("Error updating item:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error updating item",
                text: error.message,
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="text-center p-5">
            <SectionTitle header="UPDATE ITEMS" subheader="REFRESH INFO" />

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Recipe Name */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name</span>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                placeholder="Recipe Name"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </label>

                    {/* Category and Price Input */}
                    <div className="flex pt-8">
                        {/* Category Name */}
                        <select
                            {...register('category', { required: true })}
                            className="select select-secondary w-full"
                        >
                            <option disabled value="default">Select a Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>

                        {/* Price */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text mr-4">Price</span>
                                <input
                                    {...register("price", { required: true })}
                                    type="text"
                                    placeholder="Recipe Price"
                                    className="input input-bordered w-full max-w-xs"
                                />
                            </div>
                        </label>
                    </div>

                    {/* Description and File Input */}
                    <div className="pt-5">
                        <input
                            {...register("description")}
                            type="text"
                            placeholder="Description"
                            className="input textarea textarea-bordered w-full"
                        />
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="pt-3 file-input w-full max-w-xs"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button className="btn btn-outline btn-secondary">Update Items</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItems;
