describe('Full Site Unhappy Test', () => {
    beforeEach(() => {
        cy.visit('http://www.localhost:3000/')
    })
    describe('SearchBar', () => {

        it("when user enters a city that doesn't exist, the search box remains on screen", () => {
            cy.intercept('POST', '**/api/avaliable-cities', {
                statusCode: 200,
                body: [],
            }).as('getCity');

            cy.get('input[type="text"]').type('invalid city');
            cy.contains('Search').should('be.visible');

            cy.wait('@getCity');
             cy.contains('Search').click()
            cy.contains('Enter a city').should('be.visible')
            cy.contains('Enter a city name below to get the current weather:').should('be.visible')
        });



         it('displays error message when city is not found', () => {
            cy.intercept('POST', '**/api/avaliable-cities', {
            statusCode: 200,
            body: [],
            }).as('getCity')

            cy.get('input[type="text"]').type('invalid city')
            cy.contains('Search').click()

            cy.wait('@getCity')
            cy.contains('City Not Found').should('be.visible')
         })

        it('displays error message when nothing is in input box and submitted', () => {
            cy.get('input[type="text"]').clear()
            cy.contains('Search').click()
            cy.contains('City Not Found').should('be.visible')
            cy.contains('Enter a city').should('be.visible')
            cy.contains('Enter a city name below to get the current weather:').should('be.visible')
        })
        it('when displaying error message, waiting 3 seconds will clear the error message', () => {
            cy.get('input[type="text"]').clear()
            cy.contains('Search').click()
            cy.contains('City Not Found').should('be.visible')
            cy.contains('Enter a city').should('be.visible')
            cy.contains('Enter a city name below to get the current weather:').should('be.visible')
            cy.wait(3000)
            cy.contains('City Not Found').should('not.exist')

        })

    })
})