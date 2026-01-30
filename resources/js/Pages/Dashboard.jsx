import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import moment from "moment";

export default function Dashboard({ initialTransactions }) {
    const [transactions, setTransactions] = useState(initialTransactions || []);
    const fetchTransactions = async () => {
        const res = await axios.get("/api/transactions");
        // If your controller returns Inertia, use a standard API route or
        // handle the 'initialTransactions' prop update via Inertia.reload()
        console.log(res)
        setTransactions(res.data);
    };
    // Form Logic
    const { data, setData, post, processing, reset } = useForm({
        amount: 0,
        description: "",
        accountType: "",
        timestamp: new Date(),
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("api.transactions.store"), {
            onSuccess: () => reset(),
        });
    };
    const formatDateAndTime = (value, format = "MM/DD/YYYY h:mm:ss A") => {
        if (!value) return "";

        // Handle database object formats if necessary
        const dateStr =
            typeof value === "object" && value.date ? value.date : value;

        return moment(String(dateStr)).format(format);
    };
    // WebSocket Listener
    useEffect(() => {
        // Load initial data via API if props missing or refresh needed
        if (!initialTransactions || initialTransactions.length === 0) {
            fetchTransactions();
        }

        // Listen for live updates
        const channel = window.Echo.channel("transactions").listen(
            ".transaction.created",
            (e) => {
                setTransactions((prev) => {
                    const updated = [e.transaction, ...prev];
                    return updated.slice(0, 50); // Keep only latest 50 for performance
                });
            },
        );

        return () => window.Echo.leave("transactions");
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Quick Add Form */}
            <div className="card p-4 bg-white shadow mb-8 rounded">
                <h3 className="text-lg font-bold mb-4">Add Transaction</h3>
                <form
                    onSubmit={submit}
                    className="flex flex-wrap gap-4 items-end"
                >
                    <div className="flex flex-col gap-2">
                        <label>Description</label>
                        <InputText
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Amount</label>
                        <InputNumber
                            value={data.amount}
                            onValueChange={(e) => setData("amount", e.value)}
                            mode="currency"
                            currency="USD"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Account Type</label>
                        <InputText
                            value={data.accountType}
                            onChange={(e) =>
                                setData("accountType", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Date</label>
                        <Calendar
                            value={data.timestamp}
                            onChange={(e) => setData("timestamp", e.value)}
                            showTime
                        />
                    </div>
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        loading={processing}
                    />
                </form>
            </div>

            {/* Live Data Table */}
            <div className="card bg-white shadow rounded">
                <DataTable
                    value={transactions}
                    paginator
                    rows={10}
                    sortField="timestamp"
                    sortOrder={-1}
                >
                    <Column field="description" header="Description" />
                    <Column
                        field="amount"
                        header="Amount"
                        body={(r) => `$${r.amount}`}
                    />
                    <Column field="accountType" header="Account" />
                    <Column
                        field="timestamp"
                        header="Time"
                        body={(rowData) => formatDateAndTime(rowData.timestamp)}
                        sortable
                    />
                </DataTable>
            </div>
        </div>
    );
}
