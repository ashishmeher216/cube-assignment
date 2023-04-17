import { useEffect, useState } from "react";

type Photo = {
    id: number;
    url: string;
};
function MyGrid() {
    const [photos, setPhotos] = useState([]);

    const fetchPhotos = () => {
        fetch(`https://api.slingacademy.com/v1/sample-data/photos?offset=${Math.floor(Math.random() * 100)}&limit=9`)
            .then((res) => res.json())
            .then((json) =>
                setPhotos(
                    json.photos.map((photo: Photo) => {
                        return {
                            id: photo.id,
                            url: photo.url,
                        };
                    })
                )
            );
    }
    useEffect(() => {
        fetchPhotos(); // fetch photos instantly first as the first setInterval method will execute after 10 seconds
        const intervalId = setInterval(fetchPhotos, 10000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {photos.length > 0
                ? photos.map((photo: Photo) => {
                    return <img key={photo.id.toString()} src={photo.url} alt={photo.id.toString()} width="250" height="250" className="image" />;
                })
                : 
                new Array(9).fill(0).map(()=><div className="loader"></div>)
            }
        </div>
    );
}

export default MyGrid;
