describe("cart", () => {
    const login = (username) => {
        cy.session((username), () => {
            cy.visit("https://www.daraz.com.np/")
            cy.contains('a', 'Login')
                .click({force: true})
            cy.get("input[type='text']").type(username)
            cy.get("input[type='password']").type()
            cy.get('.iweb-button-mask').click()
        })
    }
    beforeEach(() => {
        login('9863087906')
    })
    it('Login and Add to Cart', () => {
        cy.visit("https://www.daraz.com.np/products/rock-10000mah-powerbank-ll-magsafe-wireless-powerbank-ll-fast-charging-pd-ll-15w-wireless-charging-ll-for-iphone-i157865844-s1134693984.html?scm=1007.51610.379274.0&pvid=570ccfcc-79d3-4fb1-8c81-4efc00d10d2c&search=flashsale&spm=a2a0e.tm80335409.FlashSale.d_157865844")
        cy.contains('span', 'Add to Cart')
            .click()
        cy.get('.next-dialog-close > .next-icon')
            .click()
        cy.get('.lzd-nav-cart')
            .click()
        cy.get('.cart-item-left > .next-checkbox > input')
            .click()
        cy.get('.checkout-order-total > .next-btn')
            .should('exist')
            .and('contain', 'CHECKOUT')
            .click()
        // cy.get('div[style*="background-color: rgb(245, 114, 36);"]')
        //   //  .should('be.visible')
        //     .click();

        cy.xpath("(//div[normalize-space()='Proceed to Pay'])[1]")
            .click({force: true})
    })
})