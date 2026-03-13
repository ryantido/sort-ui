import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TransactionActions } from "./transaction-actions";
import { TransactionStatusBadge } from "./transaction-status-badge";
import type { OverviewTableProps } from "@/types";
import { headers } from "@/constants";
import { formatTransactionDate, formatCurrency } from "@/lib/utils";
import { Activity } from "react";

export function OverviewTable({
  transactions,
  accounts,
  slice,
  setSlice,
  visible = false,
}: OverviewTableProps) {
  const accountsMap = Object.fromEntries(
    accounts.map((account) => [account.id, account]),
  );

  const hasMoreTransactions = slice < transactions.length;

  return (
    <section>
      <Activity mode={visible ? "visible" : "hidden"}>
        <h4 className="flex items-center justify-between mt-6 mb-4">
          <span className="font-semibold">Recent transactions</span>

          <Button
            variant="link"
            className="text-blue-500"
            onClick={() =>
              setSlice((prev) => (prev < transactions.length ? prev + 5 : prev))
            }
            disabled={!hasMoreTransactions}
            aria-label={visible ? "View more transactions" : "View more"}
          >
            View more
          </Button>
        </h4>
      </Activity>

      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.slice(0, slice).map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>

              <TableCell>{transaction.description}</TableCell>

              <TableCell>
                {transaction.category === "ad_spending" ? (
                  <span className="inline-flex items-center gap-2">
                    <ArrowUp
                      className="text-green-500"
                      size={18}
                      aria-hidden="true"
                    />
                    Debit
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <ArrowDown
                      className="text-red-500"
                      size={18}
                      aria-hidden="true"
                    />
                    Credit
                  </span>
                )}
              </TableCell>

              <TableCell>{formatCurrency(transaction.amount)}</TableCell>

              <TableCell className="*:rounded-md">
                <TransactionStatusBadge status={transaction.status} />
              </TableCell>

              <TableCell>{accountsMap[transaction.accountId]?.name}</TableCell>

              <TableCell>{formatTransactionDate(transaction.date)}</TableCell>

              <TableCell>
                <TransactionActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
