import React, { FunctionComponent } from 'react';

export const IconCheckBox: FunctionComponent<React.PropsWithChildren<
	React.SVGAttributes<SVGElement> | { className: string }
>> = props => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4C2 2.89543 2.89543 2 4 2ZM0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4ZM20.6717 7.43656C21.1889 6.78946 21.0837 5.84556 20.4366 5.32831C19.7895 4.81106 18.8456 4.91633 18.3283 5.56344L10.2439 15.6773L5.61855 10.5006C5.06659 9.88282 4.11834 9.82948 3.50058 10.3814C2.88282 10.9334 2.82948 11.8817 3.38145 12.4994L9.18914 18.9994C9.48329 19.3286 9.90753 19.5115 10.3488 19.4994C10.7902 19.4873 11.2037 19.2814 11.4794 18.9366L20.6717 7.43656Z"
				fill="currentColor"
			/>
		</svg>
	);
};
