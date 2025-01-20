const DetailMap = ({ link }) => {
    return (
        <div className="h-96 w-full my-10 pb-10">
            <h1 className="text-2xl font-bold mb-4">Location</h1>
            <iframe
                src={link}
                className="h-full w-full rounded-lg shadow-lg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
            ></iframe>
        </div>
    );
};

export default DetailMap;