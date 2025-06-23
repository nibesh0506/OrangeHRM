describe("Bank DB Test", () => {
    //  SQL Injection attack, and it is vulnerable
    it("Checks bank details", () => {
        const maliciousInput = `' OR '1'='1`;
        cy.task(
            'queryDb', {
                query: `SELECT *
             FROM bank.bank
             WHERE bank_name = '${maliciousInput}'`
            }).then((result) => {
            expect(result).to.have.length(0);
        });

        //  Up to here

        //  Prevented from an SQL injection attack
        const maliciousBankName = `XYZ BANK');
         DROP TABLE atm_card; --`;
        cy.task(
            'queryDb',
            `INSERT INTO bank(bank_code, address, bank_name)
             VALUES (108, 'Kathmandu', '${maliciousBankName}')`
        ).then((result) => {
            expect(result.error).to.exist;
        });
        // Up to here

        // ATM another SQL INJECTION
        cy.task('queryDb',
            `SELECT *
             FROM bank.atm_card
             WHERE cardNo = '${maliciousInput}'`
        ).then((result) => {
            expect(result).to.have.length(0);
        })
        cy.task(
            'queryDb',
            "INSERT INTO account(accNo) VALUES (1013);"
        ).then((result) => {
            expect(result.affectedRows).to.equal(1)

            cy.task(
                'queryDb',
                "DELETE FROM account where accNo IN (1013)"
            ).then((result) => {
                expect(result.error).to.not.exist
            })
        })
    })

    it.only("Atm card insertion", () => {
        cy.task(
            'queryDb', {
                query: "INSERT INTO atm_card(cardNo,expDate, CVV_no,accNo) VALUES (101,'2025-09-21',1041,1012)"
            }).then((result) => {
            expect(result.affectedRows).to.equal(1);
        });
    })
});