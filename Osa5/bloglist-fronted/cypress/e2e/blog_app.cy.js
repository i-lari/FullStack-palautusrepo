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
      cy.get('#username').type('tester')
      cy.get('#password').type('secret')
      cy.contains('log in').click()
   //   cy.contains('login succesfull')
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.contains('log in').click()
   //   cy.contains('wrong credentials')
      cy.contains('log in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('titteli')
      cy.get('#author').type('kirjailiha')
      cy.get('#url').type('uuäräl')
      cy.get('#create-button').click()
      cy.contains('titteli')
      cy.contains('kirjailiha')
      cy.contains('uuäräl')
    })
  })
})