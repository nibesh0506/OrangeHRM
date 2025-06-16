describe('Login_Test', () => {
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

    it("Testing for a login with valid credentials", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        // cy.get('.oxd-userdropdown-name').should('have.text', 'manda user')
    });
});
