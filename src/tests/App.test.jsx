import {fireEvent, render, screen, debug, waitFor, act} from "@testing-library/react";
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

            // xit('adds it to list of images that have already been clicked', async () => {
            //
            // })

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
        })
    })
})