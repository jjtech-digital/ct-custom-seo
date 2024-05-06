import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import IconButton from '@commercetools-uikit/icon-button';
import { PlusBoldIcon, CloseBoldIcon } from '@commercetools-uikit/icons';
import styles from './Settings.module.css';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { useSettings } from '../../scripts/useSettings/useSettings';
import { useAppContext } from '../../context/AppContext';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ContentNotification } from '@commercetools-uikit/notifications';

const SettingsRulesData = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const { createRuleshandler, getCtObjToken, getsavedRules } = useSettings();
  const { state, setState } = useAppContext();
  const { control, register, handleSubmit } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rulesContent',
  });

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

  const handleRemoveField = (index: number) => {
    remove(index);
    setCurrentIndex(fields.length - 2);
  };

  const onSubmit = async (data: any, event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await createRuleshandler(data, setState);
      setSuccessMessage(response?.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNotificationDismiss = () => {
    setSuccessMessage('');
  };

  useEffect(() => {
    const storeToken = async () => {
      try {
        const token = await getCtObjToken();
        if (token) {
          localStorage.setItem('token', token);
        }
      } catch (error) {
        console.error('Error storing token:', error);
      }
    };

    storeToken();
  }, []);
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
  
    const retrieveSavedRule = async () => {
      try {
        if (accessToken) {
          const response = await getsavedRules(accessToken);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveSavedRule();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        handleNotificationDismiss();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.gridRuleDataSection}`}
      >
        {fields.map((item, index) => (
          <div key={item.id}>
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
          {state?.isApiFetching ? (
            <SecondaryButton
              iconLeft={<LoadingSpinner />}
              label="Submitting"
              type="submit"
              isDisabled={true}
            />
          ) : (
            <PrimaryButton label="Submit" type="submit" />
          )}
        </div>
      </form>
      {successMessage && (
        <div className={`${styles.notificationBottom}`}>
          <ContentNotification
            type="success"
            onRemove={handleNotificationDismiss}
          >
            {successMessage}
          </ContentNotification>
        </div>
      )}
    </div>
  );
};

export default SettingsRulesData;
