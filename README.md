
# FEATUREs IMPLEMENTED

## User and Role
#### Employee:
	Can submit transactions.
	Can view only their own submitted transactions and statuses.
#### Manager:
	Can view all submitted transactions.
	Can approve or reject pending transactions.
#### Admin (optional stretch):
	Can view all transactions.
	Can view audit logs for all actions.
	Has permissions of both employees and managers.


## Transaction Submission (Employee)

- Display transactions using TanStack Table.
- **Employee:** Can view only their own transactions.
- **Manager**: Can view all transactions, with filters for status (Pending,
- Approved, Rejected).
- Basic filters for transaction status as well as Logs
	
## Approval Workflow (Manager)
- Buttons to approve or reject transactions directly in the table for pending transactions.
- Basic logging of actions (submit, approve, reject) with timestamps and user details.
- Display logs in a modal or separate table view that managers and admins can access.
- **Ability to download the audit logs as CSV.**
## Authentication & RBAC
- Basic authentication using NextAuth (Google or GitHub provider).
- Protect routes based on user roles (Employee, Manager).
- Session management with refresh tokens for long-lived sessions and logout flow.
## User Interface
- A simple dashboard layout with a transaction table using TanStack Table.
- The table should display key fields: transaction type, amount, status, and
- action buttons.
- Use Tailwind CSS for responsive design and a clean, minimal UI.
- Use shadcn components (e.g., buttons, modals) for a cohesive, polished UI.
## Technical Stack
	zod for validation of forms and API payloads.
	Use TypeScript throughout for type safety.
