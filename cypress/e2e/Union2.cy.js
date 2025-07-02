describe('Union Account and atm_card', () => {
    it("Testing for a union of account and atm_card", () => {
        const start_time = performance.now();
        cy.task('queryDb', {
            query: `INSERT INTO account(accNo, accType, balAmount, cust_id, passbook_id, bank_code)
                    VALUES (?,?,?,?,?,?)`,
            values: [1018, 'Savings', 17300.00, 1001, 4, 103]
        }).then((result) => {
            expect(result.affectedRows).to.equal(1);
            const query = `
                SELECT accNo, accType, balAmount, cust_id, passbook_id, bank_code, SLEEP(5) AS delay
                FROM account WHERE accNo = ?
                UNION
                SELECT accNo, NULL, NULL, NULL, NULL, NULL, 0 FROM atm_card WHERE accNo = 1012
            `;
            return cy.task('queryDb', {
                query: query,
                values: [1018]
            }).then((rows) => {
                const endtime = performance.now();
                const timetaken = endtime - start_time;
                const expected = {
                    accNo: 1018,
                    accType: 'Savings',
                    balAmount: '17300.00',
                    cust_id: 1001,
                    passbook_id: 4,
                    bank_code: 103,
                    delay: 0
                };
                const insertedRow = rows.find(r => r.accNo === 1018);
                expect(JSON.stringify(insertedRow)).to.equal(JSON.stringify(expected))
                expect(timetaken).to.be.greaterThan(5000);
                expect(timetaken).to.be.lessThan(5500);
            });
        });
    });
});
