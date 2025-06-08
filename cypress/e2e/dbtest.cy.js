describe("Bank DB Test", () => {
    //  Note: In this it is getting a SQL Injection attack and it is vulnerable
    it("Checks bank details", () => {
        const maliciousInput = `' OR '1'='1`;
        cy.task(
            'queryDb',
            `SELECT *
             FROM bank.bank
             WHERE bank_name = '${maliciousInput}'`
        ).then((result) => {
            expect(result).to.have.length(0);
        });
    // UP TO HERE
        const maliciousBankName = `XYZ BANK'); DROP TABLE bank; --`;
        cy.task(
            'queryDb',
            `INSERT INTO bank(bank_code, address, bank_name)
             VALUES (108, 'Kathmandu', '${maliciousBankName}')`
        ).then((result) => {
            expect(result.error).to.exist;
        });

    });
});
