describe('Full Site Happy Test', () => {
  describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })

    it('should display the correct page title', () => {
      cy.title().should('contain', 'Verify Test Application')
    })

    it('should display the correct header text', () => {
      cy.get('h1').should('contain', 'Verify Test Application')
    })

    it('should display the correct body text', () => {
      cy.get('p').should('contain', 'Welcome to the Verify Test Application!')
    })

    it('should display the correct list items', () => {
      cy.get('ol > li').should('have.length', 3)
      cy.get('ol > li').eq(0).should('contain', 'Enter the name of a city')
      cy.get('ol > li').eq(1).should('contain', 'Click on the "Search" button')
      cy.get('ol > li').eq(2).should('contain', 'The site will display the current weather information')
    })

    it('should display the correct feature list items', () => {
      cy.get('ul > li').should('have.length', 3)
      cy.get('ul > li').eq(0).should('contain', 'Real-time weather data for any city')
      cy.get('ul > li').eq(1).should('contain', 'Displays temperature, humidity, pressure, and more')
      cy.get('ul > li').eq(2).should('contain', 'Simple and easy to use interface')
    })
  })

  describe('Default Weather Page', () => {
    it('should display the correct page title', () => {
      cy.visit('http://localhost:3000/weather')
      cy.title().should('contain', 'Weather')
    })
  })

  describe('Dynamic Weather Page', () => {
    it('should display the correct page title', () => {
      cy.visit('http://localhost:3000/weather/torrance?lat=33.8358492&lon=-118.3406288')
      cy.title().should('contain', '5 Day Forecast')
    })
    it('should render expected text', () => {
      cy.visit('http://localhost:3000/weather/torrance?lat=33.8358492&lon=-118.3406288')
      cy.contains('Sunrise:')
      cy.contains('Sunset:')
      cy.contains('Wind Speed')
      cy.contains('Wind Angle')
      cy.contains('Humidity')
      cy.contains('F')
    })
  })

  describe('SearchBar', () => {
    beforeEach(() => {
      cy.visit('http://www.localhost:3000/')
    })

    it('should display a search input', () => {
      cy.get('input[type="text"]').should('be.visible')
    })

    it('should display a search button', () => {
      cy.get('button[type="submit"]').should('be.visible')
    })

    it('redirects to weather page when city is found and clicked', () => {
    cy.intercept('POST', '**/api/avaliable-cities', {
      statusCode: 200,
      body: [{ name: 'New York', lat: 40.7128, lon: -74.006 }],
    }).as('getCity')

    cy.get('input[type="text"]').type('new york')
    cy.contains('Search').click()

    cy.wait('@getCity')
    cy.get('li').contains('New York').click()

    cy.url().should('include', '/weather/new%20york')

  })



  })

})
