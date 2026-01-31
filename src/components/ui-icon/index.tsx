import { IconType } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io5';

type IconProps = {
	name: string;
	size?: number;
	color?: string;
	library?: 'fa' | 'fi' | 'io5';
};

export const UIIcon: React.FC<IconProps> = ({
	name,
	size = 14,
	color = 'currentColor',
	library = 'fi',
}) => {
	let selectedIcons: Record<string, IconType>;
	switch (library) {
		case 'fa':
			selectedIcons = FaIcons;
			break;
		case 'fi':
			selectedIcons = FiIcons;
			break;
		case 'io5':
			selectedIcons = IoIcons;
			break;
		default:
			selectedIcons = FiIcons;
			break;
	}
	const IconComponent: IconType = selectedIcons[name];
	if (!IconComponent) {
		throw new Error(`Invalid icon name: ${name}`);
	}

	return <IconComponent size={size} color={color} />;
};
