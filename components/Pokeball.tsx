import Svg, { Circle, Line, G } from 'react-native-svg';

export function Pokeball({ size = 24, color = '#DC0A2D' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G>
        <Circle cx="12" cy="12" r="10.5" stroke={color} strokeWidth="1.5" fill="none" />
        <Line x1="1" y1="12" x2="23" y2="12" stroke={color} strokeWidth="1.5" />
        <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      </G>
    </Svg>
  );
}
