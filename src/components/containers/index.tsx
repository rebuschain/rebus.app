import React, { FunctionComponent, ReactNode } from 'react';
import cn from 'clsx';
import { ContainerWrapper } from './container-wrapper';
import { IContainerSettings, IContainerState, TCardTypes } from '../../interfaces';

export const Container: FunctionComponent<React.PropsWithChildren<TCardContainerProps>> = ({
	overlayClasses,
	className,
	children,
	type = TCardTypes.CARD,
	settings = {},
}) => {
	const containerClass = getContainerClass(type);
	return (
		<ContainerWrapper
			overlayClasses={overlayClasses}
			className={cn(containerClass, className)}
			defaultState={IContainerState.ENABLED}
			draggable={settings?.draggable}
			focusable={settings?.focusable}
			hoverable={settings?.hoverable}>
			{children}
		</ContainerWrapper>
	);
};
const getContainerClass = (type: TCardTypes) => {
	if (type === TCardTypes.CARD) return 'bg-card';
	else if (type === TCardTypes.SURFACE) return 'bg-surface';
	// Custom class
	else if (type === TCardTypes.TRANSPARENT) return 'bg-transparent';
	else return 'bg-primary-200';
};
interface TCardContainerProps {
	children: ReactNode;
	className?: string;
	overlayClasses?: string;
	type?: TCardTypes;
	settings?: IContainerSettings;
}
