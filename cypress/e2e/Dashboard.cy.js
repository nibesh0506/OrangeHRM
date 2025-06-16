describe('DashBoard_Test', () => {
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
        login('Admin');
    });

    it.only("Testing for a side panel menu length", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        cy.get("ul.oxd-main-menu li").should("have.length", 12)
    })
    it("Testing for a user dropdown component", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        cy.get(".oxd-userdropdown-tab").should('be.visible')
            .click()
        cy.get(".oxd-dropdown-menu li").should("be.visible")
            .and('have.length', 4)
        cy.contains("a", "About").click()
        cy.get('.orangehrm-modal-header')
            .should('be.visible')
            .and('have.text', 'About');
        cy.get("div.oxd-grid-2.orangehrm-about").should('contain', 'Company Name')
    })
    it('Quick Launch Testing of Dashboard', () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        cy.get("button.oxd-icon-button.orangehrm-quick-launch-icon")
            .should('be.visible')
            .and('have.length', 6)
    })
    it("Testing for a search functionality in the dashboard", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        cy.get("input.oxd-input.oxd-input--active").type("P")
        cy.get("ul.oxd-main-menu li").should("be.visible")
            .and('have.length', 2)
        // cy.get("span.oxd-text.oxd-text--span.oxd-main-menu-item--name").should('have.text',"Admin")
        cy.get("button.oxd-icon-button.oxd-main-menu-button").click()
        cy.get('svg.oxd-icon.oxd-menu-icon').should('be.visible')

    })
    it('Pie Chart Testing of the dashboard', () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        cy.contains('Employee Distribution by Location')
            .parentsUntil('body')
            .find('canvas')
            .eq(2)
            .should('be.visible')
        cy.get(':nth-child(7) > .oxd-sheet > .orangehrm-dashboard-widget-body > .emp-distrib-chart > .oxd-chart-legend > :nth-child(2) > .oxd-chart-legend-key')
            .should("have.css", 'background-color')
            .and('eq','rgb(251, 82, 85)')
    })
});