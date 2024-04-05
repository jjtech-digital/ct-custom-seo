import { SetStateAction, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { SearchTextInput } from '@commercetools-frontend/ui-kit';
import Text from '@commercetools-uikit/text';
export interface IProduct {
  productKey: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
}
const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [search, setSearch] = useState('');
  const [tableData, setTableData] = useState<IProduct[]>([
    {
      "productKey": "1234",
      "name": "Tata car",
      "seoTitle": "test title",
      "seoDescription": "test description"
    },
    {
      "productKey": "5678",
      "name": "Tesla car",
      "seoTitle": "test title",
      "seoDescription": "test description"
    }
  ]);

  const [colDefs, setColDefs] = useState([
    {
      field: 'productKey',
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    { field: 'name' },
    { field: 'seoTitle' },
    { field: 'seoDescription' },
    {
      headerName: 'Actions',
      field: 'productKey',
      cellRenderer: (params: any) => (
        <div style={{ display: 'flex' }}>
          <div style={{ marginInline: '6px' }}>
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
          <div style={{ marginInline: '6px' }}>
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
  const getProducts = () => {
    fetch('http://localhost:4000/products')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

//   useEffect(() => {
//     getProducts();
//   }, []);

  const handleUpdate = (data: any) => {
    console.log(data.value);
    alert("Functionality not yet implemented")
  };
  const onGridReady = (params: SetStateAction<null>) => {
    setGridApi(params);
  };

  const defaultColDef = {
    flex: 1,
  };

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
      <div
        className="ag-theme-quartz"
        style={{ width: '100%', height: '80vh' }}
      >
        <AgGridReact
          rowSelection={'multiple'}
          suppressRowClickSelection={true}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowData={tableData as any}
          onGridReady={onGridReady as any}
        />
      </div>
    </div>
  );
};
export default GridExample;
