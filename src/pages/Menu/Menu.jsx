import { Helmet } from "react-helmet-async";

import Cover from "../Shared/Cover/Cover";

import dessertImg from "../../assets/menu/dessert-bg.jpeg"

import menuImg from "../../assets/menu/menu-bg.png"
import soupImg from "../../assets/menu/soup-bg.jpg"
import pizzaImg from "../../assets/menu/pizza-bg.jpg"
import saladImg from "../../assets/menu/salad-bg.jpg"



import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu, loading] = useMenu();

    if (loading) {
       
        <span className="loading loading-ring loading-lg"></span>
    }

    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');


    return (
        <div>
              <Helmet>
                
                <title>RESTRA.BD | Menu </title>
              
              </Helmet>
                    
               
                      <Cover img={menuImg} title="OUR MENU"></Cover>
                      <SectionTitle subheader={"Don't Miss"} header={"Today's Offer"}></SectionTitle>
                   {/* main section props sent */}

               {/* offered */}
               <MenuCategory 
               items={offered}
               title={'Offered'}

               > 

               </MenuCategory>

               {/* dessert */}
               <MenuCategory 
               items={dessert}
               title={'dessert'}
               img={dessertImg}

               >
               </MenuCategory>

               {/*soup */}
               <MenuCategory 
               items={soup}
               title={'soup'}
               img={soupImg}

               >
               </MenuCategory>
               {/* pizza*/}
               <MenuCategory 
               items={pizza}
               title={'pizza'}
               img={pizzaImg}

               >
               </MenuCategory>
            
               {/* salad*/}
               <MenuCategory 
               items={salad}
               title={'salad'}
               img={saladImg}

               >
               </MenuCategory>
            
            
            
        </div>
    );
};

export default Menu;