import PrimaryButton from '@commercetools-uikit/primary-button';
import { useEffect, useState } from 'react';
import { descriptionPattern, titlePattern } from '../../constants';
import { useProducts } from '../../scripts/useProducts/useProducts';
export default (props: any) => {
  let [editing, setEditing] = useState(false);
  let [disabled, setDisabled] = useState(false);
  const { getSeoMetaData, updateProductSeoMetaData } = useProducts();

  useEffect(() => {
    props.api.addEventListener('rowEditingStarted', onRowEditingStarted);
    props.api.addEventListener('rowEditingStopped', onRowEditingStopped);

    return () => {
      props.api.removeEventListener('rowEditingStarted', onRowEditingStarted);
      props.api.removeEventListener('rowEditingStopped', onRowEditingStopped);
    };
  }, []);

  function onRowEditingStarted(params: any) {
    if (props.node === params.node) {
      setEditing(true);
    } else {
      setDisabled(true);
    }
  }

  function onRowEditingStopped(params: any) {
    if (props.node === params.node) {
      setEditing(false);
    } else {
      setDisabled(false);
    }
  }
  const onGenerateClick = async (params: any) => {
    props.gridRef.current!.api.showLoadingOverlay();
    const aiResponse = await getSeoMetaData(params?.data?.id);
    let metaData = aiResponse?.choices?.[0]?.message?.content;

    const titleMatch = metaData?.match(titlePattern);
    const title = titleMatch ? titleMatch[2].trim() : null;

    const descriptionMatch = metaData?.match(descriptionPattern);
    const description = descriptionMatch ? descriptionMatch[2].trim() : null;

    props.setResponseFromAi({
      id: params.data.id,
      title: title,
      description: description,
    });
    props.gridRef.current!.api.hideOverlay();
  };
  const onApplyClick = async (rowIndex: number) => {
    const updatedRowData =
        props.gridRef?.current!?.api?.getDisplayedRowAtIndex(rowIndex)?.data;
    if (
        updatedRowData &&
        updatedRowData.masterData &&
        updatedRowData.masterData.current
    ) {
        const { metaTitle, metaDescription } = updatedRowData.masterData.current;
        
        if (metaTitle !== null && metaTitle !== undefined && 
            metaDescription !== null && metaDescription !== undefined) {
            const res = await updateProductSeoMetaData(
                updatedRowData.id,
                metaTitle,
                metaDescription
            );
            console.log(res);
        }
    }

    // Stop editing the grid
    props.gridRef?.current!?.api?.stopEditing(false);
};


  function stopEditing(bool: boolean) {
    props.gridRef?.current!?.api?.stopEditing(bool);
  }

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <PrimaryButton
          size="medium"
          label="Generate"
          onClick={() => onGenerateClick(props)}
          isDisabled={disabled}
        />
      </div>
      <div style={{ marginInline: '6px' }}>
        <PrimaryButton
          size="medium"
          label="Cancel"
          onClick={() => stopEditing(true)}
          isDisabled={disabled}
        />
      </div>
      <div style={{ marginInline: '6px' }}>
        <PrimaryButton
          size="medium"
          label="Apply"
          onClick={() => onApplyClick(props.rowIndex)}
          isDisabled={disabled}
        />
      </div>
    </div>
  );
};
