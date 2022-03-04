import React from 'react';

export const navigationRef = React.createRef();

const navigate = (component, screen, params) =>
  navigationRef.current?.navigate(component, {
    screen: screen,
    initial: false,
    params: params,
    
  });

export default {
  navigate,
};
