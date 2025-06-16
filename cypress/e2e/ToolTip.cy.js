// describe("ToolTip",()=>{
//     it("Testing for a tooltip of academy",()=>{
//         cy.visit('https://training.rcvacademy.com/')
//         cy.url().should('eq','https://training.rcvacademy.com/')
//         cy.xpath('//a[normalize-space()=\'AUTOMATION PRACTICE PAGE\']')
//             .should('be.visible')
//             .and('contain','AUTOMATION PRACTICE PAGE')
//             .click()
//         cy.xpath('//input[@id=\'age\']')
//             .should('have.attr','title','We ask for your age only for statistical purposes.')
//     })
// })