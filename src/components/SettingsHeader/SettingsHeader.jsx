import React from 'react';
import ViewSwitcher from '@commercetools-uikit/view-switcher';
const SettingsHeader = ({ defaultPage, selectedPage, setSelectedPage }) => {


  const menuToggleHandler = (pageName) => {
    const updatedActivePages = selectedPage.map((navMenu) => {
      if (navMenu.name === pageName) {
        return {
          ...navMenu,
          isDefaultSelected: true,
        };
      } else {
        return {
          ...navMenu,
          isDefaultSelected: false,
        };
      }
    });
    setSelectedPage(updatedActivePages);
  };

  return (
    <div>
      <ViewSwitcher.Group
        defaultSelected={defaultPage.name}
        onChange={(value) => menuToggleHandler(value)}
      >
        {selectedPage.map((navMenu, i) => {
          return (
            <ViewSwitcher.Button key={navMenu?.name} value={navMenu?.name}>
              {navMenu?.title}{' '}
            </ViewSwitcher.Button>
          );
        })}
      </ViewSwitcher.Group>
    </div>
  );
};

export default SettingsHeader;
