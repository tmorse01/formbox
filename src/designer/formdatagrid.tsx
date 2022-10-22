import {
  DataGrid,
  GridToolbar,
  GridRowsProp,
  GridColDef,
} from "@mui/x-data-grid";

export default function FormDataGrid({ data }) {
  console.log("data:", data);
  const rows: GridRowsProp = data;
  var valuesColumns = [
    {
      field: "values",
      headerName: "Form Values",
      width: 600,
    },
  ];
  if (data.length > 0) {
    valuesColumns = data?.map((form) => {
      let formColumnObject = {};
      console.log("form: ", form);
      let subForms = Object.keys(form.values).map((subForm) => {
        let subFormColumnObject = {
          field: subForm,
          headerName: subForm,
          width: 150,
        };
        console.log("subForm :", subForm);
        // var subFormValues = Object.keys(form.values[subForm].map(subFormValues) => {
        //     return {
        //         field: "formName",
        //         headerName: "Form Name",
        //         width: 150,
        //       };
        // });
        return { subFormColumnObject };
      });

      return [formColumnObject, ...subForms];
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 150 },
    { field: "documentName", headerName: "Document Name", width: 300 },
    ...valuesColumns,
  ];
  console.log("rows:", rows, "columns: ", columns);
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  );
}
