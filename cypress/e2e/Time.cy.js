describe('Time', () => {
    const login = (username) => {
        cy.session(username, () => {
            cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
            cy.get("input[name='username']").type(username);
            cy.get("input[name='password']").type('admin123');
            cy.get("button[type='submit']").click();
        });
    }
    beforeEach(() => {
        login("Admin")
    })
    it("Testing for a Timesheets Attendance Of an Employee", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        cy.get(':nth-child(4) > .oxd-main-menu-item')
            .should('be.visible')
            .and('contain.text', 'Time')
            .click()
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet')
            .and('contain', 'viewEmployeeTimesheet')
        cy.get('.oxd-topbar-header-breadcrumb-level')
            .should('have.text', 'Timesheets')
        cy.get(".oxd-topbar-body-nav > ul > li")
            .should('have.length', '4')
    })
    it.only('Employee Timesheet Testing', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet')
        //Note: NavBar TimeSheets DropDown

        cy.get('.--visited')
            .should("be.visible")
            .and("contain.text", 'Timesheets')
            .click()
            .get('.oxd-dropdown-menu > li')
            .should('have.length', '2')
            .contains('a', 'Employee Timesheets')
            .should('be.visible')
            .click()

        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet')

        cy.get('.orangehrm-card-container > .oxd-text--h6').should('have.text', 'Select Employee')

        // Note: Testing for a error message to be visible when we click view without typing anything
        // in employee name field

        cy.get('.oxd-form-actions > .oxd-button')
            .should('contain', 'View')
            .click()
        cy.get('.oxd-input-group > .oxd-text')
            .should('have.text', 'Required')

        cy.get('.oxd-autocomplete-text-input > input')
            .should('have.attr', 'placeholder', 'Type for hints...')
            .type('manda kanupriyaTestkanupriya akhil sumant sumant user Negij NegiSharma', {delay: 100})

        cy.get('.oxd-autocomplete-option')
            .should('have.length', '1')
            .and('have.text', 'manda kanupriyaTestkanupriya akhil sumant sumant user Negij NegiSharma')
            .and('be.visible')
            .click()

        cy.get('.oxd-form-actions > .oxd-button')
            .click()

        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/time/viewTimesheet/employeeId/7')

        //      cy.get('.--visited')
        //     .should('not.be.visible')
        //     .and('should.not.contain.text', 'Timesheets')
        //     .and('not.be.enabled')

        cy.get('.orangehrm-timesheet-header--title > .oxd-text')
            .should('have.text', 'Timesheet for manda kanupriyaTestkanupriya user Negij NegiSharma')

        cy.get('.oxd-alert-content > .oxd-text')
            .should('have.text', 'No Timesheets Found')

        cy.get('.oxd-date-input > .oxd-input')
            .click()

        cy.get('.oxd-calendar-selector-year').click()
        cy.get('.oxd-calendar-dropdown')
            .contains('2002')
            .click()

        cy.get('.oxd-calendar-selector-month').click()
        cy.get('.oxd-calendar-dropdown')
            .contains('September')
            .click()

        cy.get('.oxd-calendar-date')
            .contains('21')
            .click()

        cy.get('.oxd-date-input > .oxd-input')
            .should('have.value', '16-09-2002 to 22-09-2002')
    })
})