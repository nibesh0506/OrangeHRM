describe('Union', () => {
    it.only("Account Creation and Verifies Insertion using SLEEP", () => {
        const startTime = performance.now();
        cy.task('queryDb', {
            query: `INSERT INTO account(accNo, accType, balAmount, cust_id, passbook_id, bank_code) 
                VALUES (?,?,?,?,?,?);`,
            values: [1019, 'Savings', 10000.00, 1001, 4, 103]
        }).then((result) => {
            expect(result.affectedRows).to.equal(1);
            const query = `
            SELECT accNo, accType, balAmount, cust_id, passbook_id, bank_code, SLEEP(5) as delay 
            FROM account WHERE accNo = ?
            UNION
            SELECT accNo, NULL, NULL, NULL, NULL, NULL, 0 FROM atm_card WHERE accNo = 1012
        `;
            return cy.task('queryDb', {
                query: query,
                values: [1019],
            }).then((rows) => {
                const endTime = performance.now();
                const time = endTime - startTime;
                const expected = [{
                    accNo: 1019,
                    accType: 'Savings',
                    balAmount: '10000.00',
                    cust_id: 1001,
                    passbook_id: 4,
                    bank_code: 103,
                    delay: 0
                }];
                const insertedRow = rows.find(r => r.accNo === 1019);
                expect(JSON.stringify(insertedRow)).to.equal(JSON.stringify(expected[0]))
                expect(time).to.be.greaterThan(5000);
                expect(time).to.be.lessThan(5500);
            });
        });
    });
})