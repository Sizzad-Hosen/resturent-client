

const SectionTitle = ({subheader,header}) => {
    return (
        <div className="text-center md:w-4/12 mx-auto  my-4">
            <p className="text-yellow-500">___{subheader}___</p>
            <h2 className="text-3xl border-y-4 uppercase">{header}</h2>
            
        </div>
    );
};

export default SectionTitle;