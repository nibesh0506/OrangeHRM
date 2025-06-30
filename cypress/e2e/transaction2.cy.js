describe('Transaction2', () => {
    //Time-based attack (Blind SQL) with valid data
    it.only('Testing for retrieval of information and blind sql attack', () => {
        const startTime = performance.now()
        //performace.now() returns the timestamp in milliseconds
        cy.task(
            'queryDb', {
                query: `SELECT transactionId,deposit,withdrawal,amount,description, SLEEP(5) as delay FROM bank.transaction WHERE transactionId = 12`,
            }).then((result) => {
            expect(result.length).to.equal(1)
            const expected =([
                {
                    transactionId: 12,
                    deposit: '40000.00',
                    withdrawal: '20000.00',
                    amount: '20000.00',
                    description: 'ATM Withdrawal',
                    delay: 0,
                }
            ])
            expect(result).to.deep.equal(expected)
            const endTime = performance.now()
            const timetaken = endTime - startTime
            expect(timetaken).to.be.greaterThan(5000)
            expect(timetaken).to.be.lessThan(5500)
        })
    })

    //Time-based attack (Blind SQL) with invalid data
    it('Testing for retrieval of information and blind sql attack by sending invalid data', () => {
        const maliciousInput = `' OR '1'='1`
        cy.task(
            'queryDb', {
                query: `SELECT *, SLEEP(5) as delay FROM bank.transaction WHERE transactionId = '${maliciousInput}'`,
            }).then((result) => {
            expect(result.length).to.equal(0)
        })
    })
    //Null-based and Time-based combined attack
    it('Testing for retrieval of information and null sql attack', () => {
        const data = 'NULL--'
        cy.task(
            'queryDb', {
                query: `SELECT *, SLEEP(5) as delay FROM bank.transaction WHERE transactionId = '${data}'`,
            }).then((result) => {
            expect(result.length).to.be.greaterThan(0)
        })
    })
    //can check the data integrity in this format by providing it in an array
    it('should have the expected data in the database', () => {
        cy.task('queryDb', {
            query: `SELECT transactionId, deposit, withdrawal, amount, description, cust_id, passbook_id FROM bank.transaction WHERE transactionId = ?`,
            values: [3]
        }).then((result) => {
            const expected = [
                {
                    transactionId: 3,
                    deposit: '15000.00',
                    withdrawal: '0.00',
                    amount: '15000.00',
                    description: 'Bonus deposit',
                    cust_id: 1001,
                    passbook_id: 3,
                }
            ];
            expect(result).to.deep.equal(expected)
        });
    });
})