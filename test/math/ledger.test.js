const trxs = require('../fixtures/db_transaction_records.json')
const ledger = require('../../app/math/ledger')
require('../../framework/Prototypes/math')
const util = require('util')

describe('ledger', () => {
    describe('when chunking transactions', () => {
        it('chunks by scale', () => {
            let scales = ledger.scales
            for (let key in scales) {
                if (key != 'all') {
                    let chunks = ledger.scaleChunks(trxs, key)
                    let periods = chunks.map(chunk => chunk.period.start)

                    expect(periods).toHaveLength(unique(periods).length)
                }
            }
        })

        it('chunks by scale and returns limited chunks', () => {
            let scales = ledger.scales
            for (let key in scales) {
                let chunks = ledger.scaleChunks(trxs, key, 1)
                if (key != 'all') {
                    expect(chunks).toHaveLength(1)
                }
            }
        })

        it('chunks by scale and returns chunk stats', () => {
            let chunks = ledger.scaleChunks(trxs, 'week', 4)
            let stats = ledger.chunkStats(chunks)

            expect(stats).toHaveLength(chunks.length)
        })

        it('chunks are grouped by allocation', () => {
            let chunks = ledger.scaleChunks(trxs, 'week', 8)
            let allocations = ledger.chunkAllocations(chunks)

            expect(allocations).toHaveLength(chunks.length)
        })
    })
    it('Get scale change', () => {
        let expected_keys = ['income', 'liabilities', 'investment', 'savings']
        let chunks = ledger.scaleChunks(trxs, 'year', 2)
        let allocations = ledger.calculateAllocations(chunks[0].trxs)
        let change = ledger.getScaleChange(trxs, allocations, 'biweekly')

        expect(Object.keys(change)).toEqual(expect.arrayContaining(expected_keys));
    })

    it('Get monthly cash flow', () => {
        let cashFlow = ledger.calculateCashFlow(trxs)
        expect(cashFlow).toBeTruthy()
    })
})