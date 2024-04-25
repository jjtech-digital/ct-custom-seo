import Spacings from '@commercetools-uikit/spacings';
import FlatButton from '@commercetools-uikit/flat-button';
import { BackIcon } from '@commercetools-uikit/icons';
import { useIntl } from 'react-intl';
import Text from '@commercetools-uikit/text';
import messages from './Messages';
import { Link as RouterLink } from 'react-router-dom';
import SettingsHeader from '../SettingsHeader/SettingsHeader';
import SettingsData from '../SettingsData/SettingsData';
import { useState } from 'react';
import { settingsNavMock } from '../SettingsData/Settings.mock';

export interface ISelectedPageProps{
    title: string
    isDefaultSelected: boolean
    name: string
}

const Settings = (props: { linkToProducts: any }) => {
  const intl = useIntl();
  const [selectedPage, setSelectedPage] = useState<ISelectedPageProps[]>(settingsNavMock);
  const defaultPage = selectedPage?.find((item) => item.isDefaultSelected);
  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToProducts}
          label={intl.formatMessage(messages.backToProducts)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>
      <SettingsHeader
        defaultPage={defaultPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <SettingsData defaultPage={defaultPage} />
    </Spacings.Stack>
  );
};

export default Settings;
