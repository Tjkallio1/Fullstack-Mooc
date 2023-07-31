describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            username: 'ukko',
            name: 'Ukko Uunottaja',
            password: 'salainen',
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

        cy.visit('')
    })

    it('Login form is shown', function () {
        cy.contains('Login').click()
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('Login').click()
            cy.get('#username').type('ukko')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Ukko Uunottaja is logged in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('Login').click()
            cy.get('#username').type('ukko')
            cy.get('#password').type('sala')
            cy.get('#login-button').click()

            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'ukko', password: 'salainen' })
        })

        it('A blog can be created', function () {
            cy.contains('Add new blog').click()
            cy.get('#title').type('Testiblogi Cypress')
            cy.get('#author').type('Cypress Hill')
            cy.get('#url').type('www.kyprokki.fi')
            cy.get('#create-button').click()

            cy.contains('A new blog Testiblogi Cypress by Cypress Hill added')
        })

        describe('When a blog aleady exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Testiblogi Cypress',
                    author: 'Cypress Hill',
                    url: 'www.kyprokki.fi',
                })
            })

            it('A blog can be liked', function () {
                cy.contains('Testiblogi Cypress')
                cy.contains('View').click()
                cy.contains('Like').click()
            })

            it('A blog can be removed', function () {
                cy.contains('Testiblogi Cypress')
                cy.contains('View').click()
                cy.contains('Delete').click()
            })

            it('Only the one who added the blog can see delete button', function () {
                cy.contains('Add new blog').click()
                cy.createBlog({
                    title: 'Cypress 2',
                    author: 'Cypress Hill',
                    url: 'www.kyprokki.fi/rokki',
                })

                cy.contains('Cypress 2').contains('View').click()
                cy.contains('Delete')
            })

            it('Blogs are ordered by number of likes', function () {
                cy.contains('Add new blog').click()
                cy.createBlog({
                    title: 'Cypress 2',
                    author: 'Cypress Hill',
                    url: 'www.kyprokki.fi/rokki',
                })
                cy.createBlog({
                    title: 'Testiä taas',
                    author: 'Insane in the Brain',
                    url: 'www.kyprokki.fi/rap',
                })

                cy.contains('Cypress 2').contains('View').click()
                cy.contains('Like').click()
                cy.contains('Cypress 2').contains('View').click()
                cy.contains('Like').click()

                cy.contains('Testiä taas').contains('View').click()
                cy.contains('Like').click()

                cy.get('.blog').eq(0).should('contain', 'Cypress 2')
                cy.get('.blog').eq(1).should('contain', 'Testiä taas')
            })
        })
    })
})
