describe('Union Bank and Account', () => {
    it.only("Account Creation and Verifies Insertion using SLEEP", () => {
        const startTime = performance.now();
        cy.task('queryDb', {
            query: `INSERT INTO bank(bank_code, address, bank_name) 
                VALUES (?,?,?);`,
            values: [114, 'Lalitpur', 'ABC Bank']
        }).then((result) => {
            expect(result.affectedRows).to.equal(1);
            const query = `
            SELECT bank_code,address,bank_name ,SLEEP(5) as delay 
            FROM bank WHERE bank_code = ?
            UNION
            SELECT bank_code, NULL, NULL, 0 FROM account WHERE bank_code = 103`;
            return cy.task('queryDb', {
                query: query,
                values: [114],
            }).then((rows) => {
                const endTime = performance.now();
                const time = endTime - startTime;
                const expected = [{
                    bank_code: 114,
                    address: 'Lalitpur',
                    bank_name: 'ABC Bank',
                    delay: 0
                }];
                const insertedRow = rows.find(r => r.bank_code === 114);
                expect(JSON.stringify(insertedRow)).to.equal(JSON.stringify(expected[0]))
                expect(time).to.be.greaterThan(5000);
                expect(time).to.be.lessThan(5500);
            });
        });
    });
})