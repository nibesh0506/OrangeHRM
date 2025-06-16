describe('JsAlert', () => {
    const login = (username) => {
        cy.session((username), () => {
            cy.visit('https://github.com/login')
            cy.get("#login_field").should('be.visible')
                .type(username)
            cy.get("#password").should('be.visible')
                .type("")
            cy.get('.position-relative > .btn').should('be.visible')
                .and('be.enabled')
                .click()
        })
    }
    beforeEach(() => {
        login(" ")
    })
    it("testing", () => {
        cy.visit("https://github.com/")
        cy.url().should('eq', 'https://github.com/')
        cy.get('.button_to > .btn')
            .should('be.visible')
            .and('be.enabled')
            .click()
        cy.get('.BlobEditor-module__Button_1--M474l')
            .click()
        cy.on('window:confirm', (t) => {
            expect(t).to.contains('You have unsaved changes. Do you want to discard them?')
        })
        //FOR OK
    //    cy.url().should('eq', 'https://github.com/tree/main')
        //For Cancel
        cy.on("window:confirm", () => false)
    })
})