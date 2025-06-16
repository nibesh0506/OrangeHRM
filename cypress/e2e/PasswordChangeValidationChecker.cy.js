describe("Change Password Validation", () => {

    const login = (username, password = "admin123") => {
        cy.session([username, password], () => {
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
            cy.get("input[name='username']", { timeout: 10000 }).should('be.visible').type(username);
            cy.get("input[name='password']").should('be.visible').type(password);
            cy.get("button[type='submit']").click();
            cy.url().should('include', '/dashboard');
        })
    }
    beforeEach(()=>{
        login("admin")
    })

    it("Validation",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        cy.get(".oxd-userdropdown-name").click()
        cy.contains("a", "Change Password").click()
        cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/pim/updatePassword")
        cy.get('.orangehrm-card-container > .oxd-text--h6').should("have.text", "Update Password")

        //Note: clicking save button without typing any input and
        //Note: checking whether it will show the required or not in all the mandatory fields...

        cy.get('.oxd-button--secondary').click()

        //Note: checking for current password validation

        cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > .oxd-text')
            .should("be.visible")
            .and("have.text","Required")

        //Note: checking for new password validation

        cy.get('.user-password-cell > .oxd-input-group > .oxd-text')
            .should("be.visible")
            .and("have.text","Required")

        //Note: checking for a confirm password validation

        cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > .oxd-text')
            .should("be.visible")
            .and("have.text","Passwords do not match")

        //Note: checking password by providing invalid detail of current password and check validation too....

        cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("admin1235")
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type("admin@123#")

        cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("admin@123#")

        cy.get('.oxd-button--secondary').click()

        cy.get(".oxd-toast")
            .should("be.visible")
            .and("contain.text","Error")

        //Note: checking password by providing different password in new and confirm password both...

        cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("admin1234")
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type("admin@123#")

        cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("admin@123#@")

        cy.get('.oxd-button--secondary').click()

        cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > .oxd-text')
            .should("be.visible")
            .and("have.text","Passwords do not match")

        //Note: All corrects and success message has been already performed in password change.cy.js

        //Note: checking for new password same as current password and in general it should show the error message
    })
it.only("same passwords",()=>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    cy.get(".oxd-userdropdown-name").click()
    cy.contains("a", "Change Password").click()
    cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/pim/updatePassword")
    cy.get('.orangehrm-card-container > .oxd-text--h6').should("have.text", "Update Password")

    cy.get(':nth-child(1) > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("admin123")
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type("admin123")

        cy.get('.user-password-row > .oxd-grid-2 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .type("admin123")

        cy.get('.oxd-button--secondary').click()

        cy.get(".oxd-toast")
         //.should("be.visible")
            .should("contain.text","Success")
})

})