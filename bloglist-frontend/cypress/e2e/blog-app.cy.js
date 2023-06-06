describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'ukko',
      name: 'Ukko Uunottaja',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('ukko')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Ukko Uunottaja is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('ukko')
      cy.get('#password').type('sala')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('ukko')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('Testiblogi Cypress')
      cy.get('#author').type('Cypress Hill')
      cy.get('#url').type('www.kyprokki.fi')
      cy.get('#create-button').click()

      cy.contains('A new blog Testiblogi Cypress by Cypress Hill added')
    })

    it('A blog can be liked', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('Testiblogi Cypress')
      cy.get('#author').type('Cypress Hill')
      cy.get('#url').type('www.kyprokki.fi')
      cy.get('#create-button').click()

      cy.contains('A new blog Testiblogi Cypress by Cypress Hill added')
      cy.contains('View').click()
      cy.contains('Like').click()
    })

    it('A blog can be removed', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('Testiblogi Cypress')
      cy.get('#author').type('Cypress Hill')
      cy.get('#url').type('www.kyprokki.fi')
      cy.get('#create-button').click()

      cy.contains('A new blog Testiblogi Cypress by Cypress Hill added')
      cy.contains('View').click()
      cy.contains('Delete').click()
    })
  })
})