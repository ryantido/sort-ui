import { ArrowDown, ArrowUp, Check, RefreshCcw, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { TransactionActions } from "./transaction-actions";
import type { Account, Transaction } from "@/types";
import { Activity } from "react";
import { headers } from "@/constants";

export const OverviewTable = ({
  transactions,
  accounts,
  slice,
  setSlice,
  visible = false,
}: {
  transactions: Transaction[];
  accounts: Account[];
  slice: number;
  setSlice: React.Dispatch<React.SetStateAction<number>>;
  visible?: boolean;
}) => {
  const accountsMap = Object.fromEntries(
    accounts.map((account) => [account.id, account]),
  );

  const visibleTransactions = transactions.slice(0, slice);

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
          {visibleTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>

              <TableCell>{transaction.description}</TableCell>

              <TableCell>
                {transaction.category === "ad_spending" ? (
                  <span className="inline-flex items-center gap-2">
                    <ArrowUp className="text-green-500" size={18} />
                    Debit
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <ArrowDown className="text-red-500" size={18} />
                    Credit
                  </span>
                )}
              </TableCell>

              <TableCell>${transaction.amount.toFixed(2)}</TableCell>

              <TableCell className="*:rounded-md">
                {transaction.status === "completed" ? (
                  <Badge
                    style={{
                      backgroundColor: "hsla(132, 63%, 63%, 0.1)",
                      border:
                        "1px solid var(--border-default, hsla(240, 4%, 16%, 0.1))",
                      color: "hsla(129, 43%, 35%, 1)",
                    }}
                  >
                    <Check /> Paid
                  </Badge>
                ) : transaction.status === "pending" ? (
                  <Badge
                    style={{
                      backgroundColor: "hsla(28, 89%, 58%, 0.1)",
                      border:
                        "1px solid var(--border-default, hsla(240, 4%, 16%, 0.1))",
                      color: "hsla(18, 87%, 35%, 1)",
                    }}
                  >
                    <RefreshCcw /> Pending
                  </Badge>
                ) : (
                  <Badge
                    style={{
                      backgroundColor: "hsla(1, 79%, 68%, 0.1)",
                      border:
                        "1px solid var(--border-default, hsla(240, 4%, 16%, 0.1))",
                      color: "hsla(1, 74%, 40%, 1)",
                    }}
                  >
                    <X /> Failed
                  </Badge>
                )}
              </TableCell>

              <TableCell>{accountsMap[transaction.accountId]?.name}</TableCell>

              <TableCell>
                {new Date(transaction.date)
                  .toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(
                    new Date().getFullYear().toString().charAt(3) + ",",
                    new Date().getFullYear().toString().charAt(3),
                  )}
              </TableCell>

              <TableCell>
                <TransactionActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
