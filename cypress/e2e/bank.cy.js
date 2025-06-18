describe('Bank', () => {
    it("Fetching bank details", () => {
        cy.task('queryDb', {
            query: `SELECT * FROM bank.bank where bank_code=?`,
            values: [105]
        }).then((result) => {
            expect(result).to.have.length(1)
            const expected = ([{
                bank_code: 105,
                address: 'Kathmandu,Nepal',
                bank_name: 'Nepal Bank'
            }])
            expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
        })
    })

    //injection attack
    it("Fetching bank details", () => {
        const maliciousInput = `' OR '1'='1`;
        cy.task('queryDb', {
            query: `SELECT * FROM bank.bank where bank_code='${maliciousInput}'`,
        }).then((result) => {
            expect(result).to.have.length(0)
        })
    })

    it("Fetching bank details", () => {
        const maliciousInput = `' OR '1'='1`;
        cy.task('queryDb', {
            query: `SELECT *,SLEEP(5) as delay FROM bank.bank where bank_code='${maliciousInput}'`,
        }).then((result) => {
            expect(result).to.have.length(0)
        })
    })
    //time-based
    it("Fetching bank details", () => {
        const startTime = performance.now()
        cy.task('queryDb', {
            query: `SELECT * , SLEEP(5) as delay FROM bank.bank where bank_code=?`,
            values: [105]
        }).then((result) => {
            expect(result).to.have.length(1)
            const expected = ([{
                bank_code: 105,
                address: 'Kathmandu,Nepal',
                bank_name: 'Nepal Bank',
                delay: 0,
            }])
            expect(JSON.stringify(result)).to.equal(JSON.stringify(expected))
            const endTime = performance.now()
            const timetaken = endTime - startTime
            expect(timetaken).to.be.greaterThan(5000)
            expect(timetaken).to.be.lessThan(5500)
        })
    })

    it.only("Inserting bank details", () => {
        cy.task('queryDb', {
            query: `INSERT INTO bank(bank_code, address, bank_name) VALUES (107, 'Pokhara,Nepal', 'NMB Bank')`,
        }).then((result) => {
            expect(result.affectedRows).to.equal(1)
            return cy.task('queryDb', {
                query: `SELECT * FROM bank.bank where bank_code=?`,
                values: [107]
            }).then((rows) => {
                const expected = ([{
                    bank_code: 107,
                    address: 'Pokhara,Nepal',
                    bank_name: 'NMB Bank'
                }])
                expect(JSON.stringify(rows)).to.equal(JSON.stringify(expected))
            })
        })
    })
})