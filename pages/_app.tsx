import { SearchBar } from '@/components/SearchBar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SearchBar/>
    <Component {...pageProps} />
    </>
  )
}
