const Progress: React.FC = () => {
    const images: string[] = [
        "/progress1.jpg",
        "/progress2.jpg",
        "/progress3.jpg"
    ];

    return (
        <div>
            <h1>House Progress</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {images.map((img, i) => (
                    <img key={i} src={img} alt={`Progress ${i}`} style={{ width: "100%" }} />
                ))}
            </div>
        </div>
    );
};

export default Progress;
