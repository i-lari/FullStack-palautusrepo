describe('template spec', () => {
  it('login page can be opened', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('login')
  })
})