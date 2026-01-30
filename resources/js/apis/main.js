/**
 * Aggregation of functions that make AJAX calls.
 *
 * We should aim to consolidate all functions that make AJAX calls into this file. If this gets too unwieldy, we can
 * probably just use separate files and then import them all here.
 *
 */
import axios from "axios";

const url = 'http://127.0.0.1:8000'

export const TransactionAPI = {
    getTransactions(){
        return axios.get(`${url}/api/transactions`);
    },
}
