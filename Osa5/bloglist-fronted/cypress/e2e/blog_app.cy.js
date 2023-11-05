

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users',{username:'tester', password:'secret'})
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('input:first').type('tester')
      cy.get('input:last').type('secret')
      cy.contains('log in').click()
   //   cy.contains('login succesfull')
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('input:first').type('tester')
      cy.get('input:last').type('secret')
      cy.contains('log in').click()
   //   cy.contains('wrong credentials')
      cy.contains('log in')
    })
  })
})