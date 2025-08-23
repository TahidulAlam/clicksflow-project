// import DataList from "./DataList";

// const data = [
//   { id: 1, name: "John Doe", status: "Paid" },
//   { id: 2, name: "Jane Smith", status: "Unpaid" },
// ];

// const columns = [
//   { header: "ID", accessor: "id", searchable: true },
//   { header: "Name", accessor: "name", searchable: true },
//   { header: "Status", accessor: "status", searchable: true },
// ];

// const rowActions = [
//   { label: "Edit", onClick: (row) => console.log("Edit", row) },
//   { label: "Delete", onClick: (row) => console.log("Delete", row) },
// ];

// const DataListSample = () => (
//   <DataList
//     title="Users"
//     data={data}
//     columns={columns}
//     showLinkButton={true}
//     onAddClick={() => console.log("Add clicked")}
//     showSearchBar={true}
//     showColumnToggle={true}
//     showFilter={true}
//     enableRowSelection={true}
//     rowId="id"
//     onRowSelect={(rows) => console.log("Selected rows:", rows)}
//     enableExport={true}
//     rowActions={rowActions}
//     pageSizeOptions={[5, 10, 20]}
//     showRowCount={true}
//     currentPage={1}
//     onPageChange={(page) => console.log("Page changed to:", page)}
//     totalItems={data.length}
//   />
// );
