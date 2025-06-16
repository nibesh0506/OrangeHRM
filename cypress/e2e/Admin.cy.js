describe("Admin Dashboard", () => {
    const login = (username) => {
        cy.session(username, () => {
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
            cy.get("input[name='username']", { timeout: 10000 }).should('be.visible').type(username);
            cy.get("input[name='password']").should('be.visible').type('admin123');
            cy.get("button[type='submit']").click();
            cy.url().should('include', '/dashboard');
        });
    };
    beforeEach(() => {
        login("Admin");
    });
    it.only("Dashboard Appears or Not", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
        cy.url().should("include", "/dashboard");
//     cy.url().should("eq", "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        //     cy.get(".oxd-main-menu > li")
        //         .should("be.visible")
        //         .and("have.length", '12')
        //     cy.get(".oxd-main-menu > li")
        //         .eq(0)
        //         .should("be.visible")
        //         .and('contain', 'Admin')
        //         .click()
        //     cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers')
        //
        //     cy.get(".oxd-topbar-body-nav > ul > li")
        //         .should("have.length", 5)
        //
        //     cy.get('.oxd-topbar-body-nav > ul > li')
        //         .eq(0)
        //         .should("be.visible")
        //         .and('contain', 'User Management')
        //         .click()
        //
        //     cy.get(".oxd-dropdown-menu")
        //         .should("be.visible")
        //         .and("have.length", 1)
        //         .and('contain', 'Users')
        //         .click()
        //
        //     cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers')
        //
        // })
        //
        // it('Testing the system users form', () => {
        //     cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
        //     cy.url().should('contain', 'admin')
        //     cy.get('.oxd-table-filter-header-title > .oxd-text')
        //         .should("have.text", "System Users")
        //
        //     cy.get(':nth-child(3) > .oxd-icon-button > .oxd-icon')
        //         .should("exist")
        //         .click()
        //
        //     cy.get('.oxd-form')
        //         .should("not.be.visible")
        //
        //     cy.get(':nth-child(3) > .oxd-icon-button > .oxd-icon')
        //         .should("exist")
        //         .click()
        //
        //     cy.get('.oxd-form')
        //         .should("be.visible")
        //
        //     cy.get("div.oxd-grid-item.oxd-grid-item--gutters")
        //         .should("have.length", 4)
        //
        //     //Note: Checking whether error message is displayed or not when try to search system
        //     //users without inputting any details and in general error message should be dispalyed
        //
        //     cy.get('.oxd-form-actions > .oxd-button--secondary')
        //         .should('be.visible')
        //         .and('be.enabled')
        //         .click()
        //
        //     //Instead of showing error when search button is clicked when there is no input
        //     //but Url gets reloaded and shows all system users.
        //
        //     cy.get(':nth-child(1) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label')
        //         .should('have.text', 'Username')
        //
        //     //Note: Username Field
        //
        //     // cy.get(':nth-child(2) > .oxd-input')
        //     //     .should('be.visible')
        //     //     .and('exist')
        //     //     .type("Admin")
        //     //     .type('{enter}')
        //     //
        //     // cy.get('.orangehrm-horizontal-padding > .oxd-text')
        //     //     .should("have.text", '(1) Record Found')
        //
        //     //Note: USER ROLE
        //
        //     cy.get(".oxd-select-wrapper")
        //         .eq(0)
        //         .click()
        //
        //     cy.get(".oxd-select-dropdown > *")
        //         .should("have.length", 3)
        //         .contains("ESS")
        //         .click()
        //
        //     cy.get(".oxd-select-wrapper")
        //         .eq(0)
        //         .click()
        //
        //     cy.get(".oxd-select-dropdown > *")
        //         .contains("ESS")
        //         .should('not.be.enabled')
        //
        //     cy.get('.oxd-form-actions > .oxd-button--secondary')
        //         .should('be.visible')
        //         .and('be.enabled')
        //         .click()
        //
        //     cy.get('.oxd-table-card')
        //         .should('have.length',4)
        // })
    })
})