describe("Performance_HRM", () => {
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

    it("should navigate to performance page and select employee", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

        cy.contains('span', 'Performance')
            .should("be.visible")
            .click();

        cy.url().should('include', 'searchEvaluatePerformanceReview');

        cy.get("h5")
            .should("have.text", "Employee Reviews");

        cy.get('div.oxd-input-group.oxd-input-field-bottom-space')
            .should("have.length", 7);

        cy.get(':nth-child(1) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label')
            .should("have.text", "Employee Name");
        
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) .oxd-select-text').click({force: true});

        cy.get('.oxd-select-dropdown')
            .should('be.visible')
            .contains('.oxd-select-option', 'Automaton Tester')
            .click({force: true});

        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text')
            .click({force: true});

        cy.get('.oxd-select-dropdown')
            .should('be.visible')
            .contains('.oxd-select-option', 'Engineering')
            .click({force: true});

        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text')
            .click({force: true});

        cy.get('.oxd-select-dropdown')
            .should('be.visible')
            .contains('Current and Past Employees')
            .click({force: true});

        cy.get(':nth-child(5) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text')
            .click({force: true});

        cy.get('.oxd-select-dropdown')
            .should('be.visible')
            .contains('Activated')
            .click({force: true})

        cy.get(':nth-child(6) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input')
            .click({force: true})

        cy.get('.oxd-calendar-selector-year').click()
        cy.get('.oxd-calendar-dropdown')
            .contains('2002')
            .click();

        cy.get('.oxd-calendar-selector-month').click()
        cy.get('.oxd-calendar-dropdown')
            .contains('September')
            .click();

        cy.get('.oxd-calendar-date')
            .contains('21')
            .click();

        cy.get(':nth-child(6) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input')
            .should('have.value', '2002-21-09');

        cy.get('.oxd-button--secondary')
            .click({force: true})

        cy.get('.oxd-text--toast-message')
            .should("contain.text", "No Records Found")
    });
});