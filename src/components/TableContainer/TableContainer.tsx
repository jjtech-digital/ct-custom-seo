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
import { Pagination } from '@commercetools-uikit/pagination';
import { usePaginationState } from '@commercetools-uikit/hooks';
import { GearIcon } from '@commercetools-uikit/icons';
import { Link, useRouteMatch } from 'react-router-dom';

export interface IProduct {
  productKey: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
}

const TableContainer = () => {
  const [gridApi, setGridApi] = useState(null);
  const [search, setSearch] = useState('');
  const [tableData, setTableData] = useState<IProduct[]>([]);
  const [fetchedData, setFetchedData] = useState(null);
  const gridRef = useRef<AgGridReact>(null);
  const gridStyle = useMemo(() => ({ width: '100%', height: '65vh' }), []);

  const { dataLocale } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project?.languages,
  }));

  const { page, perPage } = usePaginationState();
  const { getAllProductsData } = useProducts();
  const match = useRouteMatch();
  const offSet = (page?.value - 1) * perPage?.value;

  const [colDefs, setColDefs] = useState([
    {
      field: 'productKey',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      valueGetter: (p: any) => {
        return p?.data?.key;
      },
    },
    {
      field: 'name',
      valueGetter: (params: any) => {
        // Access data based on dataLocale
        return params.data?.masterData?.current?.nameAllLocales?.[0]?.value;
      },
    },
    {
      field: 'seoTitle',
      tooltipComponentParams: { color: '#f9f5f5' },
      tooltipValueGetter: (p: { value: any }) => p.value,
      valueGetter: (params: any) => {
        return params?.data?.masterData?.current?.description;
      },

      editable: true,
    },
    {
      field: 'seoDescription',
      valueGetter: (params: any) => {
        return params.data?.masterData?.current?.description;
      },
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
        const productsData = await getAllProductsData(
          Number(perPage?.value),
          Number(offSet)
        );
        const filteredData = productsData?.data?.map(
          (product: { masterData: { current: { nameAllLocales: any[] } } }) => {
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
          }
        );
        setFetchedData(productsData);
        setTableData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dataLocale, offSet, perPage?.value]);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Text.Headline as="h2">
        {'Generate SEO title and description'}
      </Text.Headline>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '40%', display: 'flex' }}>
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
        <Link to={`${match.url}/settings`} style={{width:"35px",cursor: 'pointer'}}>
          <GearIcon size="scale" color='primary40'/>
        </Link>
      </div>
      {!!tableData?.length && tableData.length > 0 ? (
        <div
          className="ag-theme-quartz"
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          // style={containerStyle}
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
          <Pagination
            page={page?.value}
            onPageChange={page?.onChange}
            perPage={perPage?.value}
            onPerPageChange={perPage?.onChange}
            totalItems={fetchedData?.total}
          />
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
