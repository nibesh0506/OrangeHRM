describe("URL Test", () => {
    it("Testing for correct URL", () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.url().should('include', 'orangehrm');
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    });

    //Testing for a logo exist and visible

    it.only("Testing for a logo", () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('.orangehrm-login-branding img')
            .should('exist')
            .and('be.visible')
        cy.get('.orangehrm-login-logo-mobile img')
            .should('exist')
    })
});