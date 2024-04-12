import {
  SetStateAction,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { SearchTextInput } from '@commercetools-frontend/ui-kit';
import Text from '@commercetools-uikit/text';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { useProducts } from '../../scripts/useProducts/useProducts';
import { SimpleTextEditor } from '../SimpleTextEditor/SimpleTextEditor';
export interface IProduct {
  productKey: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
}

const TableContainer = () => {
  const [gridApi, setGridApi] = useState(null);

  const [search, setSearch] = useState('');
  const [editableRow, setEditableRow] = useState('');

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '70vh', width: '100%' }), []);
  const gridRef = useRef<AgGridReact>(null);

  const { getAllProductsData } = useProducts();

  const [tableData, setTableData] = useState<IProduct[]>([
    {
      productKey: '123',
      name: 'Tata car',
      seoTitle: 'test title',
      seoDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      productKey: '567',
      name: 'Tesla car',
      seoTitle: 'test title',
      seoDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },

    {
      productKey: '248',
      name: 'Tata car',
      seoTitle: 'test title',
      seoDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      productKey: '789',
      name: 'Tesla car',
      seoTitle: 'test title',
      seoDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ]);

  const [colDefs, setColDefs] = useState([
    {
      field: 'productKey',
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    { field: 'name' },
    {
      field: 'seoTitle',
      tooltipComponentParams: { color: '#f9f5f5' },
      tooltipValueGetter: (p: { value: any }) => p.value,
      // editable: (params) => params.data.seoTitle == editableRow,
      editable: true,
    },
    {
      field: 'seoDescription',
      tooltipComponentParams: { color: '#f9f5f5' },
      tooltipValueGetter: (p: { value: any }) => p.value,
      // editable: (params) => params.data.productKey == editableRow,
      editable: true,
      cellEditor: SimpleTextEditor,
      cellEditorPopup: true,
      //   cellEditorParams: {
      //     maxLength: 5000
      // }
    },
    {
      headerName: 'Actions',
      field: 'productKey',
      cellRenderer: (params: any) => (
        <div style={{ display: 'flex' }}>
          <div>
            <PrimaryButton
              size="small"
              label="Generate"
              onClick={() => alert("Functionality not yet implemented")}
              isDisabled={false}
            />
          </div>
          <div style={{ marginInline: '6px' }}>
            <PrimaryButton
              size="small"
              label="Cancel"
              onClick={() => alert("Functionality not yet implemented")}
              isDisabled={false}
            />
          </div>
          <div>
            <PrimaryButton
              size="small"
              label="Apply"
              onClick={() => onApplyClick(params.rowIndex)}
              isDisabled={false}
            />
          </div>
        </div>
      ),
    },
  ]);

  // const onBtStopEditing = useCallback(() => {
  //   gridRef.current!.api.stopEditing();
  // }, []);
  const handleUpdate = (props: any) => {
    // props.api.startEditingCell({
    //   rowIndex: props.node.rowIndex!,
    //   colKey: props.column!.getId(),
    // });
  };
  const onGridReady = (params: SetStateAction<null>) => {
    setGridApi(params?.api);
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      // editable: true,
      tooltipComponent: CustomTooltip,
    };
  }, []);
  // const getRowId = useCallback((params) => {
  //   console.log(params);
  //   return params?.data?.id;
  // }, []);
  // const onCellDoubleClick = (event) => {
  //   if (event?.column?.colId === 'seoDescription') {
  //     const rowIndex = event?.rowIndex;
  //     gridApi?.startEditingRow({ rowIndex });
  //   }
  // };

  const onApplyClick = useCallback(
    (rowIndex) => {
      const updatedRowData =
        gridRef?.current!?.api?.getDisplayedRowAtIndex(rowIndex)?.data;
      const rowData = [...tableData];
      rowData[rowIndex] = { ...rowData[rowIndex], ...updatedRowData };
      setTableData(rowData);
      gridRef?.current!?.api?.stopEditing();
    },
    [tableData]
  );

  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const productsName = await getAllProductsData();
  //       setTableData(productsName);
  //       setOriginalTableData(productsName);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text.Headline as="h1">
        {'Generate SEO title and description'}
      </Text.Headline>
      <div style={{ width: '40%' }}>
        <SearchTextInput
          placeholder="Search by Product key, Name, Seo title or Seo description "
          value={search}
          onChange={(event: { target: { value: SetStateAction<string> } }) =>
            setSearch(event.target.value)
          }
          onSubmit={() => alert(search)}
          isClearable={false}
        />
      </div>
      {!!tableData?.length && tableData.length > 0 ? (
        <div
          className="ag-theme-quartz"
          // style={{ width: '100%', height: '80vh' }}
          style={containerStyle}
        >
          <div style={gridStyle}>
            <AgGridReact
              ref={gridRef}
              // getRowId={getRowId}
              rowData={tableData as any}
              columnDefs={colDefs as any}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady as any}
              rowSelection={'multiple'}
              suppressRowClickSelection={true}
              tooltipShowDelay={1000}
              tooltipInteraction={true}
              reactiveCustomComponents={true}
              // onCellDoubleClick={onCellDoubleClick}
              // suppressClickEdit={true}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default TableContainer;
