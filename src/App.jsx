import {useEffect, useState} from 'react'
import React from "react";
import './App.css'

//TODO:
// add dropdown to switch between APIs
// add difficulty dropdown (change total number of images)
// refactor it from being one huge component

// const imageFiles = [
//     "images/2RnEtbW.png",
//     "images/3x8hEE1.png",
//     "images/4P0CqRN.jpg",
//     "images/04afe1y.jpg",
//     "images/7P0xXKY.jpg",
//     "images/8EEfLuB.jpeg",
//     "images/8m-r1_O.png",
//     "images/-VVdn7B.png",
//     "images/anKsYF2.png",
//     "images/bBTiHba.png",
//     "images/bodE1ZR.png",
//     "images/fuGfYQJ.jpg",
//     "images/Ju8JMcj.jpg",
//     "images/KfZyMS3.jpg",
//     "images/KjyZfjn.jpg",
//     "images/lMiXE7j.png",
//     "images/mbQ4c4V.jpg",
//     "images/mJkPaVR.png",
//     "images/O4gqsyo.jpg",
//     "images/Ojsl-2a.jpg",
//     "images/rF-pZ8a.jpg",
//     "images/wlvCPrF.jpg",
//     "images/wPbusA9.png",
//     "images/XcpL3nR.jpg",
//     "images/yn_F4Nt.jpeg",
//     "images/ynInTFV.jpg",
//     "images/yYcF1Me.png",
//     "images/z1rMzBR.jpg",
// ]

function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true)
    const [score, setScore] = useState(0)
    const [alreadyClicked, setAlreadyClicked] = useState([])
    const [gameOver, setGameOver] = useState(false);
    const importImage = async (path) => {
        const imageUrl = new URL(path, import.meta.url).href;
        return imageUrl;
    };

    // Fetching images from API
    const apiUrl = 'https://api.waifu.pics/many/sfw/waifu';
    var formdata = new FormData();
    formdata.append("exclude", "[]");

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    // Online Mode - Use API
    const fetchImages = async () => {
        try {
            const response = await fetch(apiUrl, requestOptions)
            const data = await response.json();
            setImages(data.files);
            setLoading(false);
        } catch (e) {
            console.error('An error occurred:', e.message);
            setLoading(false);
        }
    }

    // Offlane Mode - Use Local Files (Testing Purposes)
    // const fetchImages = async () => {
    //     try {
    //         const imageUrls = await Promise.all(imageFiles.map((path) => importImage(path)));
    //         setImages(imageUrls);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error('Error fetching images:', error.message);
    //     }
    // };

    useEffect(() => {
        fetchImages();
    }, []);

    const Picture = ({image, index}) => {
        return (
            <img onClick={() => handlePictureOnClick(image)} className="my-4 h-96" src={image} alt={image}
                 data-testid={`${index}-image`}/>
        )
    }

    const GameOverDisplay = ({gameOver}) => {
        if (!gameOver) {
            return null;
        }
        return <div className={"text-white"} data-testid="game-over">Game Over</div>;
    }


    const handlePictureOnClick = (image) => {
        if (gameOver) {
            return
        }

        if (!alreadyClicked.includes(image)) {
            setScore((prevScore) => prevScore + 1)
            setImages((prevState) => shuffleArray(prevState))
            setAlreadyClicked((prevState) => [...prevState, image])
        } else {
            setGameOver(true);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }

    const handleRestartButtonClick = async () => {
        setLoading(true);
        setGameOver(false);
        setScore(0);
        setAlreadyClicked([]);
        await fetchImages();
    }
    const RestartButton = ({gameOver}) => {
        if (!gameOver) {
            return null
        }

        return (
            <button data-testid="restart-button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRestartButtonClick}>Restart</button>
        )
    }

    return (
        <div>
            <RestartButton gameOver={gameOver}/>
            <div className={"text-white"} data-testid="score-display">Score: {score}</div>
            <GameOverDisplay gameOver={gameOver}/>
            {
                loading ?
                    (<p>Loading...</p>)
                    :
                    (
                        <div className="flex flex-wrap justify-between">
                            {images.map((image, index) => {
                                return <Picture image={image} key={image} index={index}/>
                            })}
                        </div>
                    )
            }
        </div>
    )
}

export default App
