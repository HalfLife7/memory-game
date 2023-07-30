import {useEffect, useState} from 'react'
import './App.css'

const Picture = ({img, index}) => {
    return (
        <img className="h-96 my-4" src={img} alt={index}/>
    )
}

function App() {
    // const [images, setImages] = useState([])
    // const [loading, setLoading] = useState(true)

    // Fetching images from API
    // const apiUrl = 'https://api.waifu.pics/many/sfw/waifu';
    // var formdata = new FormData();
    // formdata.append("exclude", "[]");
    //
    // var requestOptions = {
    //     method: 'POST',
    //     body: formdata,
    //     redirect: 'follow'
    // };
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             // const response = await fetch(apiUrl, requestOptions)
    //             // const data = await response.json();
    //             const data = []
    //             console.log(data.files)
    //             setImages(data.files);
    //             setLoading(false);
    //         } catch (e) {
    //             console.error('An error occurred:', e.message);
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    // }, [])

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false)
    const importImage = async (path) => {
        const imageUrl = new URL(path, import.meta.url).href;
        return imageUrl;
    };

    // click image
    // check if it belongs to one of the ones that has been clicked already
    // if it hasn't been clicked yet
        // increase score by 1
        // add to state that tracks which ones have been clicked already
        // shuffle images
    // if it has been clinked already
        // end game
        // prevent any of the items from being clicked
        // restart game button is now new game

    // restart game / continue button
        // fetch new images
        // reset score


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imageFiles = await import.meta.glob('./images/*.*');
                const imagePaths = Object.keys(imageFiles);
                const imageUrls = await Promise.all(imagePaths.map((path) => importImage(path)));
                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching images:', error.message);
            }
        };

        fetchImages();
    }, []);

  return (
    <>
        {
            loading ?
            (<p>Loading...</p>)
                :
            (
                <div className="flex flex-wrap justify-between">
                    {images.map((image, index) => <Picture img={image} key={index}/>)}
                </div>
            )
        }
    </>
  )
}

export default App
