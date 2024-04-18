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
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
export interface IProduct {
  productKey: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
}

const TableContainer = () => {
  const [gridApi, setGridApi] = useState(null);

  const [search, setSearch] = useState('');

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '70vh', width: '100%' }), []);
  const gridRef = useRef<AgGridReact>(null);

  const { getAllProductsData } = useProducts();

  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project?.languages,
  }));

  const [tableData, setTableData] = useState<IProduct[]>([]);

  const [colDefs, setColDefs] = useState([
    {
      headerName: 'productKey',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      valueGetter: (p: any) => {
        return p?.data?.key;
      },
    },
    {
      headerName: 'name',
      valueGetter: (params) => {
        // Access data based on dataLocale
        return params.data?.masterData?.current?.nameAllLocales?.[0]?.value;
      },
    },
    {
      headerName: 'seoTitle',
      tooltipComponentParams: { color: '#f9f5f5' },
      tooltipValueGetter: (p: { value: any }) => p.value,
      valueGetter: (p: any) => {
        return p?.data?.masterData?.current?.description;
      },

      editable: true,
    },
    {
      field: 'seoDescription',
      tooltipComponentParams: { color: '#f9f5f5' },
      tooltipValueGetter: (p: { value: any }) => p.value,

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
              onClick={() => alert('functionality not yet implemented')}
              isDisabled={false}
            />
          </div>
          <div style={{ marginInline: '6px' }}>
            <PrimaryButton
              size="small"
              label="Cancel"
              onClick={() => alert('functionality not yet implemented')}
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
  // const handleUpdate = (props: any) => {
  // props.api.startEditingCell({
  //   rowIndex: props.node.rowIndex!,
  //   colKey: props.column!.getId(),
  // });
  // };
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

  // const onCancelClick = useCallback((rowIndex) => {
  //   const rowDataCopy = [...originalTableData];
  //   rowDataCopy[rowIndex] = { ...originalTableData[rowIndex] };
  //   setTableData(rowDataCopy);
  //   gridRef?.current!?.api?.stopEditing();
  // },[originalTableData]
  // );
  //   const onCancelClick = (rowIndex) => {
  //     gridRef?.current!?.api?.stopEditing();
  //     gridRef?.current!?.api?.refreshCells({ rowNodes: [gridRef?.current!?.api?.getRowNode(rowIndex)] });
  // };

  useEffect(() => {
    setTableData([]);
    const fetchData = async () => {
      try {
        const productsData = await getAllProductsData();
        const filteredData = productsData?.data?.map((product) => {
          const nameInCurrentLocale =
            product?.masterData?.current?.nameAllLocales?.find(
              (item) => item?.locale === dataLocale
            );
          return {
            ...product,
            masterData: {
              ...product?.masterData,
              current: {
                ...product?.masterData?.current,
                nameAllLocales: [nameInCurrentLocale],
              },
            },
          };
        });
        setTableData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dataLocale]);

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
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
};
export default TableContainer;
// productProjectionSea
// TProductProjectionSearchResult
