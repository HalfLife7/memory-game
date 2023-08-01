import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import React from "react";
import App from "../App.jsx";

// App.test.js

describe('App', () => {
    describe('when user clicks image', () => {
        describe('when image has not been clicked yet', () => {
            it('increases score by 1', async () => {
                const { container } = render(<App/>);

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