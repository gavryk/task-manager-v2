import { IconType } from 'react-icons';
import * as Icons from 'react-icons/fi';

type IconProps = {
	name: keyof typeof Icons;
	size?: number;
	color?: string;
};

export const UIIcon: React.FC<IconProps> = ({ name, size = 14, color = 'currentColor' }) => {
	const IconComponent: IconType = Icons[name];
	if (!IconComponent) {
		throw new Error(`Invalid icon name: ${name}`);
	}

	return <IconComponent size={size} color={color} />;
};
