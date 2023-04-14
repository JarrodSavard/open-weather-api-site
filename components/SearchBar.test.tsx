import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import {SearchBar} from './SearchBar'
import { useRouter } from 'next/router'
import React from 'react'


// Create a fake useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))


describe('SearchBar', () => {
    test('renders search input and button', () => {
    // Set up the fake useRouter hook to return an empty query object
    useRouter.mockImplementation(() => ({
        query: {},
    }))

    // Render the component
    render(<SearchBar />)

    // Check that the search input and button are rendered
    const searchInput = screen.getByPlaceholderText('Enter a city')
    expect(searchInput).toBeInTheDocument()

    const searchButton = screen.getByRole('button', { name: 'Search' })
    expect(searchButton).toBeInTheDocument()
    })
    test('sets the query value correctly when typing in the input', () => {
    // Set up the fake useRouter hook to return an empty query object
    useRouter.mockImplementation(() => ({
        query: {},
    }))

    // Render the component
    render(<SearchBar />)

    // Get the search input and type into it
    const searchInput = screen.getByPlaceholderText('Enter a city')
    fireEvent.change(searchInput, { target: { value: 'New York' } })

    // Check that the input value is set correctly
    expect(searchInput).toHaveValue('New York')
    })
    test('displays an error message if the city is not found', async () => {
       const { getByText, getByPlaceholderText } = render(<SearchBar />)
       const input = getByPlaceholderText('Enter a city')
       const searchButton = getByText('Search')

       fireEvent.change(input, { target: { value: 'Nonexistent City' } })
       fireEvent.click(searchButton)

       // Wait for the error message to appear
       await waitFor(() => {
         expect(getByText('City Not Found')).toBeInTheDocument()
       })
    })
})
