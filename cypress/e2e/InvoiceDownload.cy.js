describe('Invoice Download', () => {
    it('Testing for a download invoice functionality', () => {
        cy.visit('https://automationexercise.com')
        cy.url().should('include', 'automationexercise')
        cy.get('a > img')
            .should('exist')
            .and('be.visible')
        cy.get('ul.nav.navbar-nav>li')
            .should('be.visible')
            .and('have.length', 8)
        cy.get('.shop-menu > .nav > :nth-child(2) > a')
            .should('be.visible')
            .and('contain.text', 'Products')
            .click()
        cy.url().should('eq', 'https://automationexercise.com/products')
        cy.get('h2.title.text-center')
            .should('have.text', 'All Products')
        cy.get('.product-image-wrapper')
            .should('have.length', 34)
        cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn')
            .should('be.visible')
            .and('have.text', 'Add to cart')
            .click()
        cy.get('u')
            .should('have.text', 'View Cart')
            .click()
        cy.url().should('eq', 'https://automationexercise.com/view_cart')
        cy.get('.col-sm-6 > .btn')
            .should('be.visible')
            .and('have.text', 'Proceed To Checkout')
            .click()
        cy.get('.modal-body > :nth-child(2) > a > u')
            .should('be.visible')
            .contains('u', 'Register / Login')
            .click()
        cy.url().should('eq', 'https://automationexercise.com/login')
        cy.get('.signup-form>h2')
            .should('be.visible')
            .and('have.text', 'New User Signup!')
        cy.get('input[name="name"]')
            .should('be.visible')
            .type('demouser')
        cy.get("input[data-qa='signup-email']")
            .should('be.visible')
            .type('omed1@gmail.com')
        cy.get("button[data-qa='signup-button']")
            .should('be.visible')
            .and('have.text', 'Signup')
            .click()
        cy.get('[data-qa="password"]')
            .type('@Demo1234@!@')
        cy.get('[data-qa="first_name"]')
            .type('Demo')
        cy.get('[data-qa="last_name"]')
            .type("User")
        cy.get('[data-qa="company"]')
            .type('XYZ')
        cy.get('[data-qa="address"]')
            .type('Demo Address')
        cy.get('[data-qa="city"]')
            .type('Demo City')
        cy.get('[data-qa="state"]')
            .type('Demo State')
        cy.get('[data-qa="zipcode"]')
            .type('12345')
        cy.get('[data-qa="country"]')
            .type('India')
        cy.get('[data-qa="mobile_number"]')
            .type('1234567890')
        cy.get('[data-qa="create-account"]')
            .should('have.text', 'Create Account')
            .click()
        cy.get('b')
            .should('have.text', 'Account Created!')
    })
        it.only('Login', () => {
            cy.visit('https://automationexercise.com/login')
            cy.visit('https://automationexercise.com/login')
            cy.get('[data-qa="login-email"]').type("omed1@gmail.com")
            cy.get('[data-qa="login-password"]')
                .type("@Demo1234@!@")
            cy.get('[data-qa="login-button"]')
                .click()
            cy.get('.shop-menu > .nav > :nth-child(2) > a')
                .should('be.visible')
                .and('contain.text', 'Products')
                .click()
            cy.url().should('eq', 'https://automationexercise.com/products')
            cy.get('h2.title.text-center')
                .should('have.text', 'All Products')
            cy.get('.product-image-wrapper')
                .should('have.length', 34)
            cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn')
                .should('be.visible')
                .and('have.text', 'Add to cart')
                .click()
            cy.get('u')
                .should('have.text', 'View Cart')
                .click()
            cy.url().should('eq', 'https://automationexercise.com/view_cart')
            cy.get('.col-sm-6 > .btn')
                .should('be.visible')
                .and('have.text', 'Proceed To Checkout')
                .click()
            cy.get(':nth-child(7) > .btn')
                .should('be.visible')
                .and('have.text', 'Place Order')
                .click()
            cy.get('[data-qa="name-on-card"]')
                .should('be.visible')
                .type('demouser')
            cy.get('[data-qa="card-number"]')
                .should('be.visible')
                .type('4242424242424242')
            cy.get('[data-qa="cvc"]')
                .should('be.visible')
                .type('123')
            cy.get('[data-qa="expiry-month"]')
                .type('01')
            cy.get('[data-qa="expiry-year"]')
                .type('2025')
            cy.get('[data-qa="pay-button"]')
                .should('be.visible')
                .and('be.enabled')
                .and('have.text', 'Pay and Confirm Order')
                .click()

            cy.get('[data-qa="order-placed"] > b')
                .should('be.visible')
                .and('have.text', 'Order Placed!')

            cy.downloadFile('https://automationexercise.com/download_invoice/500',
                'cypress/downloads', 'Invoice.txt')
            cy.readFile('cypress/downloads/Invoice.txt', 'base64')
                .then((base64) => {
                    expect(base64).to.be.a('string')
                    expect(base64).to.not.be.empty
                })
            //invoice.txt appears in the cypress / downloads folder
            //a bug arises as it can process the order confirmation page of the expired card too...
        })
})