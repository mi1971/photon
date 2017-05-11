export default class {
    static lenders() {
        return ['ANZ', 'CBA', 'CUA', 'NAB', 'ING', 'Macquarie', 'St George', 'Suncorp', 'Westpac']
    }

    static lenderIncomePolicies() {
        return [
            {
                lender: 'ANZ',
                minCasualMonths: 3,
                altCasualMonths: 3,
                altPreviousCasualMonths: 0,
                minPermanentMonths: 1,
                altPermanentMonths: 1,
                altPreviousePermanentMonths: 0,
                casualWeeksPerYear:52
            },
            {
                lender: 'Westpac',
                minCasualMonths: 12,
                altCasualMonths: 6,
                altPreviousCasualMonths: 24,
                minPermanentMonths: 1,
                altPermanentMonths: 1,
                altPreviousePermanentMonths: 0,
                casualWeeksPerYear:46
            }
        ]
    }
}