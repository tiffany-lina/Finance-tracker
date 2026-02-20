# Student Finance Tracker

## Theme Overview
An app to track student expenses, budgets, and transactions.  
Users can:
- Add, edit, delete transactions
- Categorize spending (Food, Books, Transport, Entertainment, Fees, Other)
- Search using regex patterns
- View dashboard with totals, top categories, trends
- Set spending caps and see alerts

---

## Wireframes Sketch

1. **Dashboard**
- Shows total transactions, total spent, top category, last 7-day trend
- Spending cap status (remaining/overage)
- Canvas for mini trend chart

2. **Transactions Table**
- Columns: Description | Amount | Category | Date | Actions (Edit/Delete)
- Sortable by Date, Description, Amount
- Regex live search bar above table
- Highlight matches without breaking accessibility

3. **Add/Edit Form**
- Fields: Description, Amount, Category, Date
- Buttons: Save / Cancel
- Form validation using regex
- Inline errors displayed with aria-live

4. **Settings**
- Base currency + 2 additional currencies
- Manual conversion rates
- Spending cap

---

## Data Model

```json
{
  "id": "txn_0001",
  "description": "Lunch at cafeteria",
  "amount": 12.50,
  "category": "Food",
  "date": "2025-09-29",
  "createdAt": "2025-09-29T12:00:00Z",
  "updatedAt": "2025-09-29T12:00:00Z"
}
## Wireframes (ASCII style)

[DASHBOARD]
+-------------------------+
| Total: $0.00            |
| Top Category: None      |
| Last 7 days trend chart |
| Spending Cap Alert      |
+-------------------------+

[TRANSACTIONS TABLE]
+------------------------------------------+
| Description | Amount | Category | Date | Actions |
+------------------------------------------+

[ADD/EDIT FORM]
+---------------------------------+
| Description: [___________]      |
| Amount: [_____]                |
| Category: [Dropdown]           |
| Date: [YYYY-MM-DD]             |
| [Save] [Cancel]                |
+---------------------------------+

[SETTINGS]
+-------------------------------+
| Base Currency: [USD]          |
| Currency 2: [EUR]             |
| Currency 3: [GBP]             |
| Spending Cap: [_____]         |
+-------------------------------+

---

## Data Model Example
```json
{
  "id": "txn_0001",
  "description": "Lunch at cafeteria",
  "amount": 12.50,
  "category": "Food",
  "date": "2025-09-29",
  "createdAt": "2025-09-29T12:00:00Z",
  "updatedAt": "2025-09-29T12:00:00Z"
}
