import Head from 'next/head'
import React from 'react'

// This is the default page that is rendered when the user navigates to the weather page

const defaultWeatherPage = () => {
  return (
    <div>
      <Head>
        <title>Weather</title>
      </Head>
    </div>
  )
}

export default defaultWeatherPage