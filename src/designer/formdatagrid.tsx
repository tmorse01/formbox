import {
  DataGrid,
  GridToolbar,
  GridRowsProp,
  GridColDef,
} from "@mui/x-data-grid";

export default function FormDataGrid({ data }) {
  console.log("data:", data);

  function createColumns() {
    if (data.length > 0) {
      let values = data[0];
      return Object.keys(values)?.map((dataField) => {
        return { field: dataField, headerName: dataField, width: 200 };
      });
    } else {
      return [];
    }
  }

  const rows: GridRowsProp = data;
  var columns: GridColDef[] = createColumns();

  console.log("rows:", rows, "columns: ", columns);
  return (
    <DataGrid
      autoHeight={true}
      rows={rows}
      columns={columns}
      getRowId={(row) => row._id}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  );
}
