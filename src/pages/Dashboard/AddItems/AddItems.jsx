import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit,reset } = useForm();
    const axiosPublic = useAxiosPublic();
   const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success)
            {
                // now send the menu items data to the server ith the image url 
                const menuItem = {
                    name:data.name,
                    category : data.category,
                    price:data.price,
                    recipe:data.recipe,
                    image:res.data.data.display_url,

                }
                // 
                const menuRes =await axiosSecure.post ('/menu', menuItem);
                console.log(menuRes.data);
                if(menuRes.data.insertedId )
                    {
                        reset();

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${data.name} Sucessfully Added to Menuitems`,
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }

            }
        console.log(res.data);
    };

    return (
        <div className="p-8 my-5">
            <SectionTitle header={"ADD ITEMS"} subheader={"WHAT'S NEW"} />

            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* recipe name */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Recipe Name</span>
                            <input {...register("name", { required: true })}
                                type="text"
                                placeholder="Recipe Name"
                                className="input input-bordered w-full" />
                        </div>
                    </label>

                    {/* category and price input */}
                    <div className="flex pt-8">
                        {/* category name */}
                        <select defaultValue="default" {...register('category', { required: true })}
                            className="select select-secondary w-full">
                            <option disabled value="default">Select a Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>

                        {/* price name */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text mr-4">Price</span>
                                <input {...register("price", { required: true })}
                                    type="text"
                                    placeholder="Recipe Price"
                                    className="input input-bordered w-full max-w-xs" />
                            </div>
                        </label>
                    </div>

                    {/* description and file input */}
                    <div className="pt-5">
                        <input {...register("description")}
                            type="text"
                            placeholder="Description"
                            className="input textarea textarea-bordered w-full" />
                        <input {...register("image", { required: true })}
                            type="file"
                            className="pt-3 file-input w-full max-w-xs" />
                    </div>

                    {/* submit button */}
                    <div className="text-center">
                        <button className="btn btn-outline btn-secondary">Add Items</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
