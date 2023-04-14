describe('Full Site Unhappy Test', () => {
    beforeEach(() => {
        cy.visit('http://www.localhost:3000/')
    })
    describe('SearchBar', () => {
        it('displays an error message when request fails', () => {
            cy.visit('http://www.localhost:3000')
            cy.intercept('POST', '**/api/avaliable-cities', { statusCode: 400 }).as('fetchCities')

            const query = 'abzsdbwkaudbwaukduab'
            cy.get('input').type(query)
            cy.get('button').click()

            cy.wait('@fetchCities')
            cy.on('window:alert', (text) => {
            expect(text).to.equal('An error occurred while fetching the data. Please try again later.')
            })
        })
    })
})