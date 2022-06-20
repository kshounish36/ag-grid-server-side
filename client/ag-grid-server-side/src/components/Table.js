import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import datasource from '../datastore/Datasource';

const Table = () => {

  const [gridApi, setGridApi] = useState(null);

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columns, setColumns] = useState([
    { headerName: "Athlete", field: "athlete", filter: "agTextColumnFilter" },
    { headerName: "Age", field: "age", filter: "agTextColumnFilter" },
    { headerName: "Country", field: "country", filter: "agTextColumnFilter" },
    { headerName: "Year", field: "year", filter: "agTextColumnFilter" },
    { headerName: "Date", field: 'date', filter: "agTextColumnFilter" },
    { headerName: "Sport", field: 'sport', filter: "agTextColumnFilter" },
    { headerName: "Gold", field: 'gold', filter: "agTextColumnFilter" },
    { headerName: "Silver", field: 'silver', filter: "agTextColumnFilter" },
    { headerName: "Bronze", field: 'bronze', filter: "agTextColumnFilter" },
    { headerName: "Total", field: 'total', filter: "agTextColumnFilter" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 90,
      resizable: true,
      filter: true, 
      floatingFilter: true, 
      sortable: true
    };
  }, []);
  
  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  },[]);

  useEffect(() => {
    if(gridApi) {
      gridApi.setServerSideDatasource(datasource);
    }
  }, [gridApi]);

  return (
    <div>
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
            columnDefs={columns}
            pagination={true}
            paginationPageSize={8}
            domLayout="autoHeight"
            rowModelType={'serverSide'}
            serverSideStoreType={'partial'}
            onGridReady={onGridReady}
            defaultColDef={ defaultColDef }
            />
        </div>
      </div>
    </div>
  );
};
export default Table