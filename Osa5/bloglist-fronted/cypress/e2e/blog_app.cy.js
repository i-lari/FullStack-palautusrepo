describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users',{ username:'tester', password:'secret' })
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
    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('titteli')
      cy.get('#author').type('kirjailiha')
      cy.get('#url').type('uuäräl')
      cy.get('#create-button').click()

      cy.get('#viewblog-button').click()
      cy.get('#likes').contains('0')
      cy.get('#like-button').click()
      cy.get('#likes').contains('1')
    })
    it('A blog can be deleted', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('titteli')
      cy.get('#author').type('kirjailiha')
      cy.get('#url').type('uuäräl')
      cy.get('#create-button').click()

      cy.get('#viewblog-button').click()
      cy.get('#delete-button').click()
      cy.contains('titteli').should('not.exist')
      cy.contains('kirjailiha').should('not.exist')
      cy.contains('uuäräl').should('not.exist')
    })
    it('only blog creator can see delete-button', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('titteli')
      cy.get('#author').type('kirjailiha')
      cy.get('#url').type('uuäräl')
      cy.get('#create-button').click()
      cy.request('POST', 'http://localhost:3003/api/users',{ username:'tester2', password:'secret2' })
      cy.get('#logout-button').click()
      cy.contains('login').click()
      cy.get('#username').type('tester2')
      cy.get('#password').type('secret2')
      cy.get('#login-button').click()
      cy.get('#viewblog-button').click()
      cy.contains('#delete-button').should('not.exist')
    })

  })
})