import SectionTitle from "../../components/SectionTitle/SectionTitle";
import feturedImg from '../../assets/home/featured.jpg'
const Featured = () => {
    return (
        <div>
               <SectionTitle
         subheader={"Check It Out"}
         header={"FROM OUR MENU"}
      >
     
      </SectionTitle>

      {/* _________ */}
      <div className="hero min-h-screen">
        <img src={feturedImg} alt="" />

  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
        <div>
            <img src={feturedImg} alt="" />
        </div>
      <h1 className="mb-5 text-5xl font-bold">FEB, 2024</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-outline btn-accent">READ MORE</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default Featured;