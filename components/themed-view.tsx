import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

/**
 * @param lightColor The color to use in light mode.
 * @param darkColor The color to use in dark mode.
 */
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

/**
 * A custom View component that supports themes.
 * It uses the `useThemeColor` hook to apply different background colors for light and dark modes.
 * @param {ThemedViewProps} props The properties for the component.
 * @returns {JSX.Element} The rendered view component.
 */
export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
