import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";


const UserHome = () => {
    const {user} = useAuth();

    return (
        <div>
            <SectionTitle header={"USER HOME"} subheader={"DASHBOARD"}></SectionTitle>

              <p className="text-4xl ps-8">Welcome to,,</p>
            <h2 className="text-4xl text-center">Name : {user?.displayName}</h2>
            <h2 className="text-4xl text-center">Email : {user?.email}</h2>
        </div>
    );
};

export default UserHome;