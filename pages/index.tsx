import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Verify Test Application</title>
      </Head>
    <div className="py-10 ">
      <header className="bg-white p-6 ">
        <h1 className="text-2xl font-bold text-gray-900">Verify Test Application</h1>
      </header>
      <main className="p-6">
        <p className="text-gray-700 mb-4">
          Welcome to the Verify Test Application! This site allows you to get current weather information for any city around the world using the OpenWeatherAPI.
        </p>
        <p className="text-gray-700 mb-4">{`Here's`} how it works:</p>
        <ol className="list-decimal ml-6 mb-4">
          <li className="mb-2">Enter the name of a city in the search bar on the home page</li>
          <li className="mb-2">Click on the {`"Search"`} button</li>
          <li className="mb-2">The site will display the current weather information for the city</li>
        </ol>
        <p className="text-gray-700 mb-4">Here are some of the features:</p>
        <ul className="list-disc ml-6 mb-4">
          <li className="mb-2">Real-time weather data for any city</li>
          <li className="mb-2">Displays temperature, humidity, pressure, and more</li>
          <li className="mb-2">Simple and easy to use interface</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Give it a try and see the weather for your favorite city!
            </p>
        </main>
        </div>
        </>

  );

}
