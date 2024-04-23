import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import IconButton from '@commercetools-uikit/icon-button';
import { PlusBoldIcon, CloseBoldIcon } from '@commercetools-uikit/icons';
import styles from './Settings.module.css';
import PrimaryButton from '@commercetools-uikit/primary-button';
const SettingsRulesData = () => {
  const { control, register, handleSubmit } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rulesContent',
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (fields.length === 0) {
      append({ rulesInput: '', deletable: false });
    } else {
      setCurrentIndex(fields.length - 1);
    }
  }, [fields, append]);

  const handleAddField = () => {
    append({ rulesInput: '', deletable: false });
    setCurrentIndex(fields.length);
  };

  const handleRemoveField = (index:number) => {
    remove(index);
    setCurrentIndex(fields.length - 2);
  };

  const onSubmit = (data: any, event: { preventDefault: () => void; }) => {
    event.preventDefault();
   alert("check submitted data in console")
    console.log("data",data);
  };
console.log(fields)
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.gridRuleDataSection}`}
      >
        {fields.map((item, index) => (
          <div  key={item.id}>
            <div className={`${styles.gridRuleInputContainer}`}>
              <input
              className={`${styles.gridRuleInputStyle}`}
                {...register(`rulesContent.${index}.rulesInput`, {
                  required: 'Rules Content is required',
                })}
                placeholder="Generate good content"
              />
              {index === currentIndex ? (
                <IconButton
                  icon={<PlusBoldIcon />}
                  label="Add"
                  onClick={handleAddField}
                />
              ) : (
                <IconButton
                  icon={<CloseBoldIcon />}
                  label="Delete"
                  onClick={() => handleRemoveField(index)}
                />
              )}
            </div>
          </div>
        ))}
        <div className={`${styles.ruleFormSubmitButton}`}>
          <PrimaryButton label="Submit" type="submit" isDisabled={false} />
          
        </div>
      </form>
    </div>
  );
};

export default SettingsRulesData;
