import {fireEvent, render, screen, debug, waitFor} from "@testing-library/react";
import React from "react";
import App from "../App.jsx";

// App.test.js

describe('App', () => {
    describe('when user clicks image', () => {
        describe('when image has not been clicked yet', () => {
            it('increases score by 1', async () => {
                const { container } = render(<App/>);

                const scoreElement = screen.getByTestId('score-display');
                expect(scoreElement.textContent).toEqual('Score: 0');

                await waitFor(() => {
                    const firstImage = screen.getByTestId('0-image');
                    fireEvent.click(firstImage);

                    expect(scoreElement.textContent).toEqual('Score: 1');
                })
            })
        })
        describe('when image has already been clicked before', () => {

        })
    })
})