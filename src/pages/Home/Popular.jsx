import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItems from "../Shared/MenuItems/MenuItems";
import useMenu from "../../hooks/useMenu";

const Popular = () => {
    const [menu, loading] = useMenu();
    
    if (loading) {
       
        <span className="loading loading-ring loading-lg"></span>
    }

    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className="mt-12 mb-12">
            <SectionTitle 
                subheader="From Our Menu"
                header="Popular Items"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
                {popular.map(item => (
                    <MenuItems 
                        key={item._id}
                        item={item}
                    />
                ))}
            </div>
        </section>
    );
};

export default Popular;
