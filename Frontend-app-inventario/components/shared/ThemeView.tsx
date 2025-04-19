import { View, ViewProps } from 'react-native';
import React from 'react';

interface Props extends ViewProps {
  className?: string;
  darkClassName?: string; // Añadir soporte para clases oscuras personalizadas
}

const ThemeView = ({ children, className = '', darkClassName = '', ...rest }: Props) => {
  return (
    <View
      className={`${className} ${darkClassName ? darkClassName : 'bg-white dark:bg-slate-900'}`}
      {...rest}
    >
      {children}
    </View>
  );
};

export default ThemeView;
