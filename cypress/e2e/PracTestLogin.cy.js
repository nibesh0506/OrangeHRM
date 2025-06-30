//Manual vs Automation Advantages...

describe("PracTest",()=>{
    it("Invalid Username Login",()=>{
        cy.visit("https://practicetestautomation.com/practice-test-login")
        cy.get('#username').should('be.visible')
            .type('student12')
        cy.get('#password').should('be.visible')
            .type('Password123')
        cy.get('#submit').should('have.text','Submit')
            .click()
        cy.get('#error').should('be.visible')
            .and('contain.text','Your username is invalid!')
    })

    it("Invalid Password Login",()=>{
        cy.visit("https://practicetestautomation.com/practice-test-login")
        cy.get('#username').should('be.visible')
            .type('student')
        cy.get('#password').should('be.visible')
            .type('Password12')
        cy.get('#submit').should('have.text','Submit')
            .click()
        cy.get('#error').should('be.visible')
            .and('contain.text','Your password is invalid!')
    })

    it("Invalid Credentials Login",()=>{
        cy.visit("https://practicetestautomation.com/practice-test-login")
        cy.get('#username').should('be.visible')
            .type('student12')
        cy.get('#password').should('be.visible')
            .type('Password12')
        cy.get('#submit').should('have.text','Submit')
            .click()
        cy.get('#error').should('be.visible')
            .and('contain.text','Your username is invalid!')
    })

    it.only("Invalid Password Login",()=>{
        cy.visit("https://practicetestautomation.com/practice-test-login")
        cy.get('#username').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#submit').should('have.text','Submit')
            .click()
        cy.get('#error').should('be.visible')
            .and('contain.text','Your username is invalid!')
    })
})