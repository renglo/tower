"use client"

import * as React from "react"
import { useState, useEffect } from 'react';

import { replaceUUID } from '@/lib/tank_utils'; // Adjust the path as necessary


import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { 
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


function generateReactType(fields:any) {

  console.log('Field to be filtered (GRT)')
  console.log(fields)

  // Filter out fields with layer > 0
  const filteredFields = fields.filter((field:any) => field.layer < 1);
  //const filteredFields = fields;
  console.log('Filtered Fields (GRT)')
  console.log(filteredFields)
  // Create an object to store the type definition
  const typeDefinition: {[index: string]:any} = {};
  //const myObj: {[index: string]:any} = {}

  filteredFields.forEach((field:any) => {
    const name: string = field.name;
  
    if (field.options) {
      // Create union type for fields with options, considering the keys of the options object
      typeDefinition[name] = Object.keys(field.options).map(option => `"${option}"`).join(" | ");
    } else {
      typeDefinition[name] = field.type;
    }
  });

  console.log('Type Definition (GRT)')
  console.log(typeDefinition)

  return typeDefinition;
}

  
interface RowData {
  _id: string;
  // Add more properties if necessary
}

interface ColumnType {
  getIsSorted: () => string | false;
  toggleSorting: (desc: boolean) => void;
}

interface RowType {
  getValue: (key: string) => string;
}

interface WidgetDefinition {
  h: ({ column }: { column: ColumnType }) => JSX.Element;
  c: ({ row }: { row: RowType }) => JSX.Element;
}

function TableWidgetDef(widget:'text'|'checkbox'|'address'|'currency_usd'|'date'|'file'|'hours'|'radio'|'images'|'items'|'location'|'email'|'phone'|'radio'|'select'|'textarea'|'textarray'|'url'|'video', label: string, name: string): ColumnDef<RowType, unknown> {

  let w: WidgetDefinition = {
    h: () => <></>,
    c: () => <></>,
  };

  switch (widget) {
    case 'address':
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'checkbox':   
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'currency_usd':   
        w = {
          h: () => <div className="text-center">{label}</div>,
          c: ({ row }) => {
              const amount = parseFloat(row.getValue(name));
              const formatted = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
              }).format(amount);
              return <div className="text-center font-medium">{formatted}</div>
          }
        }
        break;

    case 'date':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'file':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'hours':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;
    
    case 'radio':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'images':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'items':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'location':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'email':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'phone':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;


    case 'select':     
        w = {
          h: ({ column }) => <Button 
            variant="ghost"
            className="text-left"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >{label}</Button>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'text':     
        w = {
          h: ({ column }) => <Button 
            variant="ghost"
            className="text-left"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >{label}</Button>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'textarea':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'textarray':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'url':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;

    case 'video':     
        w = {
          h: () => <div className="text-left">{label}</div>,
          c: ({ row }) => (
              <div className="capitalize">{row.getValue(name)}</div>
              )
        }
        break;
    default:
      throw new Error(`Unsupported widget type: ${widget}`);
  }

  return {
    accessorKey: name,
    header: w.h,
    cell: w.c,
  };
}


// Define the type for a single field object (based on the blueprint fields)
interface Field {
  name: string;
  type: string;
  widget: string;
  options?: { [key: string]: string }; // Optional options field for enum-like types
  cardinality: string;
  default: string;
  hint: string;
  id: string;
  label: string;
  layer: number;
  multilingual: boolean;
  order: number;
  required: boolean;
  semantic: string;
  source: string;
}



type WidgetType = 'address' | 'select' | 'textarea' | 'video' | 'text' | 'checkbox' | 'radio' | 'url' | 'email' | 'location' | 'date' | 'file' | 'currency_usd' | 'hours' | 'images' | 'items' | 'phone' | 'textarray';

function isWidgetType(widget: string): widget is WidgetType {
  return [
      'address', 'select', 'textarea', 'video', 'text', 'checkbox', 'radio', 
      'url', 'email', 'location', 'date', 'file', 'currency_usd', 'hours', 
      'images', 'items', 'phone', 'textarray'
  ].includes(widget);
}



function generateColumnDef(fields: Field[]): any[] {
  const output: any[] = [];

  console.log('Field to be filtered (GCD)')
  console.log(fields)

  const filteredFields = fields.filter(field => field.layer <= 0);
  //const filteredFields = fields;

  console.log('Filtered Fields (GCD)')
  console.log(filteredFields)



  for (const field of filteredFields) {

    if (isWidgetType(field.widget)) {
        const row = TableWidgetDef(field.widget, field.label, field.name);
        output.push(row);
    } else {
        console.error(`Unsupported widget type: ${field.widget}`);
    }
    
  }

  console.log('Output (GCD)')
  console.log(output)

  return output;
}


const tableFooter = {
  id: "actions",
  enableHiding: false,
  cell: ({ row }: { row: { original: RowData } }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original._id)}
          >
            Copy Item ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};


interface DataTableProps {
  onSelectId: (id: string) => void;  
  refresh: any;              
  blueprint: any; 
  portfolio: string; 
  org: string; 
  tool: string; 
  ring: string;             
}


// Define the type for your data items
interface DataItem {
  [key: string]: any; // Adjust this to the specific structure of your data
}

export default function DataTable({ onSelectId, refresh, blueprint, portfolio, org, tool, ring  }: DataTableProps) {

  let columnDefs = []; 

  console.log('BLUEPRINT 111')
  console.log(blueprint);
  console.log(tool);

  // Add Definitions to ColumnDef
  // Assuming generateReactType generates an object type from fields
  //DEPRECATED//const FieldsType = generateReactType(fields);
  // Now use typeof to extract the type
  type FieldsType = ReturnType<typeof generateReactType>;

  //const [blueprint, setBlueprint] = useState({});
  const [data, setData] = useState<DataItem[]>([]); // State to hold table data
  
  const [columns, setColumns] = useState<ColumnDef<FieldsType>[]>([]); // State to hold column definitions
  //const [columns, setColumns] = useState<ColumnDef<FieldsType>[]>([]);
  //const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<Error | null>(null);

  const portfolio_id = portfolio
  const org_id = org
  //const tool_id = tool
  const ring_id = ring


  useEffect(() => {
    // Function to fetch Data
    const fetchData = async () => {
      try {


          
        // Generate the Column Definitions
        // Generate Column Defs
        columnDefs = generateColumnDef(blueprint.fields);
        // Add header to the beginning
        //columnDefs.unshift(tableHeader); 
        // Add footedto the end
        columnDefs.push(tableFooter);
        // Create Columns
        const columnsd: ColumnDef<FieldsType>[] = columnDefs;
        // Save columns in state
        setColumns(columnsd);
              
      

        // Fetch Data
        const dataResponse = await fetch(`${import.meta.env.VITE_API_URL}/_data/${portfolio_id}/${org_id}/${ring_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.accessToken}`,
          },
        });
        const response = await dataResponse.json();
        setData(response['items']);


        console.log("BLUEPRINT 222:")
        console.log(blueprint);
        
        if (blueprint) {
          const updatedData = await replaceUUID(response['items'],blueprint);
          console.log('After UUID Replacement:')
          console.log(updatedData);
          setData(updatedData); // Update the state with the new data
        }
 

      } catch (err) {
        if (err instanceof Error) {
          setError(err);  // Now TypeScript knows `err` is of type `Error`.
        } else {
          setError(new Error("An unknown error occurred"));  // Handle other types
        }
        console.log(error)
        
      } finally {
        //setLoading(false);
      }
    };

    fetchData();
  }, [blueprint,org,refresh]);

  //console.log(blueprint)
  //console.log(data)


  /*
  // 3. Generate the Column Definitions
  // Generate Column Defs
  columnDefs = generateColumnDef(fields);
  // Add header to the beginning
  columnDefs.unshift(tableHeader); 
  // Add footedto the end
  columnDefs.push(tableFooter);
  // Add Definitions to ColumnDef
  let Type = generateReactType(fields);
  // 4. Create Columns
  const columns: ColumnDef<Type>[] = columnDefs
  */



  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'account_type', desc: true },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  



  return (
    <div className="w-full">
      
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}> 
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onSelectId(row.original._id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 hidden">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


