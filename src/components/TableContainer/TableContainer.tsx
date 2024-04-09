import { SetStateAction, useState, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { SearchTextInput } from '@commercetools-frontend/ui-kit';
import Text from '@commercetools-uikit/text';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { useProducts } from '../../scripts/useProducts/useProducts';
export interface IProduct {
  productKey: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
}

const TableContainer = () => {
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState<IProduct[]>([]);

  const [search, setSearch] = useState('');

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '70vh', width: '100%' }), []);

  const { getAllProductsData } = useProducts();
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
    },
    {
      field: 'seoDescription',
      tooltipComponentParams: { color: '#f9f5f5' },
      tooltipValueGetter: (p: { value: any }) => p.value,
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
              onClick={() => handleUpdate(params)}
              isDisabled={false}
            />
          </div>
          <div style={{ marginInline: '6px' }}>
            <PrimaryButton
              size="small"
              label="Cancel"
              onClick={() => handleUpdate(params)}
              isDisabled={false}
            />
          </div>
          <div>
            <PrimaryButton
              size="small"
              label="Apply"
              onClick={() => handleUpdate(params)}
              isDisabled={false}
            />
          </div>
        </div>
      ),
    },
  ]);
  
  useEffect(() => {
    const productsData = async () => {
      try {
        const productsName = await getAllProductsData();
        console.log(productsName)
        setTableData(productsName);
      } catch (error) {
        console.log(error)
      }
    };
    productsData();
  }, []);

  const handleUpdate = (data: any) => {
    console.log(data.value);
    alert('Functionality not yet implemented');
  };
  const onGridReady = (params: SetStateAction<null>) => {
    setGridApi(params);
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,

      tooltipComponent: CustomTooltip,
    };
  }, []);

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
              rowData={tableData as any}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady as any}
              rowSelection={'multiple'}
              suppressRowClickSelection={true}
              tooltipShowDelay={500}
              tooltipInteraction={true}
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
