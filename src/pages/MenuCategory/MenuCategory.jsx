import { Link } from "react-router-dom";
import Cover from "../Shared/Cover/Cover";
import MenuItems from "../Shared/MenuItems/MenuItems";



const MenuCategory = ({ items, title, img }) => {
    return (
        <div >
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 mb-10 mt-10 lg:grid-cols-3 grid-cols-1 gap-8">
                {items.map(item => (
                    <MenuItems key={item._id} item={item} />
                ))}
            </div>

            <div className="card-actions justify-start p-2">
                <Link to={`/order/${title}`}>
          <button className="btn btn-outline btn-info">Order Now</button>
                </Link>
          </div>
        </div>
    );
};

export default MenuCategory;
