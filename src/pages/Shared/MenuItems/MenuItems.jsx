


const MenuItems = ({item}) => {
    const {name,price,recipe,image}=item;

    return (
        <div className="flex  space-x-4">
            <img style={{borderRadius:'0px 100px 100px 100px'}} className="h-[150px] w-[100px]" src={image} alt="" />

            <div>
                <p className="text-2xl text-yellow-400 ">{name}</p>
                <p className="text-xl">{recipe}</p>
            </div>
            <p className="text-2xl">${price}</p>
            

            


        </div>
    );
};

export default MenuItems;