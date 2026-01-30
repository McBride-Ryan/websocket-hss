import moment from 'moment';

export const filtersMixin = {
    methods: {
        formatDateAndTime(item, format='MM/DD/YYYY h:mm:ss A') {
            if (!item) {
                return;
            }

            if (typeof item === 'object' && item.hasOwnProperty('date')) {
                item = item.date;
            }

            return moment(String(item)).format(format);
        },
        filteredTransactionSummaryTotal(transactions){
            if(!transactions){
                return;
            }
            // Use reduce directly to sum the amounts
            const totalAmount = transactions.reduce((sum, action) => {
                // Ensure action.amount is treated as a float before adding.
                const amount = parseFloat(action.amount);

                // Check if the parsed amount is a valid number to prevent NaN in sum
                if (!isNaN(amount)) {
                    return sum + amount;
                }
                return sum; // If not a valid number, just return the current sum
            }, 0); // Start the sum at 0

            // Handle Floating-Point Precision Errors before Formatting Currency
            return this.formatCurrency(totalAmount.toFixed(2));
        },
        formatCurrency(amount) {
            if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
                if (isNaN(amount) || !isFinite(amount)) {
                    return "$0.00";
                }
            }

            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            return formatter.format(amount);
        }
    }
}
