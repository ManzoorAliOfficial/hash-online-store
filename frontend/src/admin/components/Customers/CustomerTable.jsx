import DataTable from "../Common/DataTable";
export default function CustomerTable({ rows }) {
  return (
    <DataTable
      columns={["name", "email", "orders", "spent", "joined"]}
      rows={rows}
    />
  );
}
