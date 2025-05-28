describe("Password Change of HRM", () => {
    const login = (username) => {
        cy.session(username, () => {
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
            cy.get("input[name='username']").type(username);
            cy.get("input[name='password']").type("admin123");
            cy.get("button[type='submit']").click();
        })
    }
    const New_Password = "admin@123#"
    beforeEach(() => {
        login("Admin")
    })

    it("Changing password", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        cy.get('.oxd-userdropdown-img').click()
        cy.contains("a", "Change Password").click()
        cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/pim/updatePassword")
        cy.get('.orangehrm-card-container > .oxd-text--h6').should("have.text", "Update Password")

        cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("admin123")

        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type("admin@123#")

        cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("admin@123#")

        cy.get('.oxd-button--secondary').click()

        cy.get(".oxd-toast")
            .should('be.visible')
            .and("contain.text", "Success")

        cy.get(".oxd-userdropdown-name").click()
        cy.contains("a", "Logout").click()

        cy.url().should('eq', "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("input[name='username']").type("Admin");
        cy.get("input[name='password']").type(New_Password);
        cy.get("button[type='submit']").click();

        //NOTE: changed password cant get login and this is a bug for a orange hrm auth login system
        cy.url().should('eq', "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get('.oxd-alert-content > .oxd-text').should("have.text", "Invalid credentials")
     })
})