/// <reference types="Cypress" />

const faker = require('faker')

describe('Create Issue', () => {

    it('successfully', () => {
        const issue = {
            title: `issue-${faker.random.uuid()}`,
            description: faker.random.words(3),
            project: {
                name: `project-${faker.random.uuid()}`,
                description: faker.random.words(3),
            }
        }

        cy.api_createIssue(issue)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.title).to.equal(issue.title)
                expect(response.body.description).to.equal(issue.description)
            })
    })
    
})