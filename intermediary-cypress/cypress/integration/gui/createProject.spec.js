/// <reference types="Cypress" />

const faker = require('faker')

describe('Create Project', () => {
    before(()=> cy.login())

    it('successfuly', () => {
        const project = {
            name:`project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }

        cy.gui_createProject(project).pause()

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}root/${project.name}`)
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')

    })
})