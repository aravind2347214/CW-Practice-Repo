import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type {
  ColDef,
  ColGroupDef,
  ITextFilterParams,
  IDateFilterParams,
  INumberFilterParams,
  ValueFormatterParams,
  ICellRendererParams,
} from "ag-grid-community";
import {
  ClientSideRowModelModule,
  DateFilterModule,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";
import { IEmployeeData, sampleData } from './employees';

// Register required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  ValidationModule,
  DateFilterModule,
  NumberFilterModule
]);




const textFilterParams: ITextFilterParams = {
  filterOptions: ["contains", "notContains"],
  debounceMs: 200,
  maxNumConditions: 1,
};

const dateFilterParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string): number => {
    if (cellValue == null) return -1;
    const dateParts = cellValue.split("/");
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
  minValidYear: 2020,
  maxValidYear: 2024,
};

const numberFilterParams: INumberFilterParams = {
  filterOptions: ['equals', 'greaterThan', 'lessThan'],
  defaultOption: 'greaterThan',
};

const currencyFormatter = (params: ValueFormatterParams): string => {
  return params.value ? `$${params.value.toLocaleString()}` : '';
};

const booleanCellRenderer = (params: ICellRendererParams): string => {
  return params.value ? '✅' : '❌';
};

function AGgridPOC () {
 

  const [rowData, setRowData] = useState<IEmployeeData[]>(sampleData);
  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: 'Personal Information',
      children: [

        {columnGroupShow: 'closed', field:''},
        {
          columnGroupShow: 'open', 
          field: 'name',
          filter: 'agTextColumnFilter',
          filterParams: textFilterParams
        },
        { 
          columnGroupShow: 'open', 
          field: 'age',
          filter: 'agNumberColumnFilter',
          filterParams: numberFilterParams
        },
        { 
          columnGroupShow: 'open', 
          field: 'hometown',
          filter: 'agTextColumnFilter',
          filterParams: textFilterParams
        }
      ]
    },
    {
      headerName: 'Employment Details',
      children: [
        {columnGroupShow: 'closed', field:''},

        { 
          columnGroupShow: 'open', 
          field: 'position',
          filter: 'agTextColumnFilter',
          filterParams: textFilterParams
        },
        { 
          columnGroupShow: 'open', 
          field: 'dateOfJoining',
          filter: 'agDateColumnFilter',
          filterParams: dateFilterParams
        },
        { 
          field: 'salary',
          columnGroupShow: 'open', 
          filter: 'agNumberColumnFilter',
          filterParams: numberFilterParams,
          valueFormatter: currencyFormatter
        },
        { 
          columnGroupShow: 'open', 
          field: 'isTopPerformer',
          filter: 'agSetColumnFilter',
          cellRenderer: booleanCellRenderer
        }
      ]
    },
    {
      headerName: 'Sales Performance',
      children: [
        {columnGroupShow: 'closed', field:''},

        {
          columnGroupShow: 'open', 
          field: 'sales2024',
          filter: 'agNumberColumnFilter',
          filterParams: numberFilterParams,
          valueFormatter: currencyFormatter
        },
        {
          columnGroupShow: 'open', 
          field: 'sales2025',
          filter: 'agNumberColumnFilter',
          filterParams: numberFilterParams,
          valueFormatter: currencyFormatter
        },
        {
          columnGroupShow: 'open', 
          field: 'sales2026',
          filter: 'agNumberColumnFilter',
          filterParams: numberFilterParams,
          valueFormatter: currencyFormatter
        }
      ]
    }
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      filter: true,
      sortable: true,
      resizable: true,
    };
  }, []);

  const containerStyle = useMemo(() => ({ width: '100%', height: '80%' }), []);

  return (
    <div className={`bg-gray-100 p-4 rounded-[6px] h-[600px]`}>
      <div className='px-2 mb-10 text-5xl font-bold text-left text-black'>
        Employee Performance Dashboard
      </div>
      <div style={containerStyle}>
        <AgGridReact<IEmployeeData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          enableRangeSelection={true}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
};

export default AGgridPOC;