import React from 'react';
import { NavItems } from './Settings.types';
import SettingsRulesData from './SettingsRulesData';
import SettingsOpenAiData from './SettingsOpenAIData';
import SettingsAwsData from './SettingsAwsData';
import SettingsGoogleAiData from './SettingsGoogleAiData';

const SettingsData = ({ defaultPage }: any) => {
  
  return (
    <div>
      {(() => {
        switch (defaultPage?.title) {
          case NavItems.RULES:
            return <SettingsRulesData />;
          case NavItems.OPENAI:
            return <SettingsOpenAiData />;
          case NavItems.AWS:
            return <SettingsAwsData />;
          case NavItems.GOOGLEAI:
            return <SettingsGoogleAiData />;

          default:
            return null;
        }
      })()}
    </div>
  );
};

export default SettingsData;
