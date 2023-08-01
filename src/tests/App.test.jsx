import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import App from "../App.jsx";


describe('App', () => {
    const mockFetch = async () => {
        return {
            ok: true,
            status: 200,
            json: async () => (
                {
                    "files": [
                        "https://example.com/images/2RnEtbW.png",
                        "https://example.com/images/3x8hEE1.png",
                        "https://example.com/images/4P0CqRN.jpg",
                        "https://example.com/images/04afe1y.jpg",
                        "https://example.com/images/7P0xXKY.jpg",
                        "https://example.com/images/8EEfLuB.jpeg",
                        "https://example.com/images/8m-r1_O.png",
                        "https://example.com/images/-VVdn7B.png",
                        "https://example.com/images/anKsYF2.png",
                        "https://example.com/images/bBTiHba.png",
                        "https://example.com/images/bodE1ZR.png",
                        "https://example.com/images/fuGfYQJ.jpg",
                        "https://example.com/images/Ju8JMcj.jpg",
                        "https://example.com/images/KfZyMS3.jpg",
                        "https://example.com/images/KjyZfjn.jpg",
                        "https://example.com/images/lMiXE7j.png",
                        "https://example.com/images/mbQ4c4V.jpg",
                        "https://example.com/images/mJkPaVR.png",
                        "https://example.com/images/O4gqsyo.jpg",
                        "https://example.com/images/Ojsl-2a.jpg",
                        "https://example.com/images/rF-pZ8a.jpg",
                        "https://example.com/images/wlvCPrF.jpg",
                        "https://example.com/images/wPbusA9.png",
                        "https://example.com/images/XcpL3nR.jpg",
                        "https://example.com/images/yn_F4Nt.jpeg",
                        "https://example.com/images/ynInTFV.jpg",
                        "https://example.com/images/yYcF1Me.png",
                        "https://example.com/images/z1rMzBR.jpg",
                    ]
                }
            )
        }
    }

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(mockFetch);
    });

    afterEach(() => {
        global.fetch.mockRestore();
    });

    describe('when user clicks image', () => {
        describe('when image has not been clicked yet', () => {
            it('increases score by 1', async () => {
                const {container} = render(<App/>);

                await waitFor(() => {
                    expect(screen.getByTestId('0-image')).toBeInTheDocument();
                })

                const scoreElement = screen.getByTestId('score-display');
                expect(scoreElement.textContent).toEqual('Score: 0');

                const firstImage = screen.getByTestId('0-image');
                fireEvent.click(firstImage);

                await waitFor(() => {
                    expect(scoreElement.textContent).toEqual('Score: 1');
                })
            })

            it('shuffles the images', async () => {
                render(<App/>)

                await waitFor(() => {
                    expect(screen.getByTestId('0-image')).toBeInTheDocument();
                })

                const firstImage = screen.getByTestId('0-image');

                fireEvent.click(firstImage);

                await waitFor(() => {
                    const newFirstImage = screen.getByTestId('0-image');
                    expect(firstImage.src).not.toEqual(newFirstImage.src);
                })
            })
        })
        describe('when image has already been clicked before', () => {
            it('ends the game', async () => {
                const {container} = render(<App/>)

                await waitFor(() => {
                    expect(screen.getByTestId('0-image')).toBeInTheDocument();
                })

                const firstImage = screen.getByTestId('0-image');

                fireEvent.click(firstImage);

                await waitFor(() => {
                    const sameImageClicked = screen.getByAltText(firstImage.alt);
                    expect(firstImage.src).toEqual(sameImageClicked.src);
                })

                const sameImage = screen.getByAltText(firstImage.alt)
                fireEvent.click(sameImage);

                await waitFor(() => {
                    expect(screen.getByText('Game Over')).toBeInTheDocument()
                })
            })
        })
    })
    describe('when user restarts game', () => {
        it('fetches new images', async () => {
            render(<App/>)

            await waitFor(() => {
                expect(screen.getByTestId('0-image')).toBeInTheDocument();
            })

            const firstImage = screen.getByTestId('0-image');

            fireEvent.click(firstImage);

            await waitFor(() => {
                const sameImageClicked = screen.getByAltText(firstImage.alt);
                expect(firstImage.src).toEqual(sameImageClicked.src);
            })

            const sameImage = screen.getByAltText(firstImage.alt)
            fireEvent.click(sameImage);

            await waitFor(() => {
                expect(screen.getByText('Restart')).toBeInTheDocument()
            })

            const restartButton = screen.getByTestId('restart-button');
            fireEvent.click(restartButton);

            await waitFor(() => {
                expect(screen.queryByText('Game Over')).not.toBeInTheDocument()
                expect(screen.queryByText('Restart')).not.toBeInTheDocument()
            })
        })
    })
})