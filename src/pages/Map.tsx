const Map: React.FC = () => {
    return (
        <div>
            <h1>Find Us</h1>
            <iframe
                title="home-location"
                src="https://www.google.com/maps/embed?pb=!1m18!..."
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default Map;
