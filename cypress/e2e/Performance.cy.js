describe("Performance_HRM", () => {
    const login = (username) => {
        cy.session((username), () => {
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
            cy.get("input[name='username']").type(username);
            cy.get("input[name='password']").type('admin123');
            cy.get("button[type='submit']").click();
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

        cy.get('.oxd-autocomplete-text-input > input')
            .should("have.attr", 'placeholder', 'Type for hints...')
            .type("manda", {delay: 100});

        cy.get('.oxd-autocomplete-option')
            .contains("manda akhil user")
            .should('be.visible')
            .click();

        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) .oxd-select-text').click({force: true});

        cy.get('.oxd-select-dropdown')
            .should('be.visible')
            .contains('IT Manager')
            .click({force: true});

    });
});
