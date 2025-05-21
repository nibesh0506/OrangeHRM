import 'cypress-iframe';

describe("Testing for a date picker", () => {
    it("Automated Date Picker", () => {
        const today = new Date()
        const day = today.getDate()
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const dd = String(today.getDate()).padStart(2, '0')
        const yy = today.getFullYear()
        const formatted = `${mm}/${dd}/${yy}`

        cy.visit("https://jqueryui.com/datepicker/")

        cy.frameLoaded(".demo-frame")

        cy.iframe(".demo-frame")
            .contains(new RegExp(`^${day}^`))
            .click()

        cy.iframe(".demo-frame")
            .should("have.value", formatted)
    })
});
