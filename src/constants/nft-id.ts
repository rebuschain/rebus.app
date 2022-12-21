export const COLOR_OPTIONS = [
	{
		name: 'Rebus',
		colors: ['#a7cfba', '#9fe0e0', '#2083DF', '#8A008A', '#33001E'],
	},
	{
		name: 'Blue',
		colors: ['#A8E0FF', '#7BC8FF', '#0295FF', '#0B0084', '#0B0084'],
	},
	{
		name: 'Red',
		colors: ['#ff5454', '#F8A8A8', '#FC4343', '#860020', '#860020'],
	},
	{
		name: 'Pink',
		colors: ['#EE8BF0', '#F24BF5', '#B34BF5', '#96005C', '#411000'],
	},
	{
		name: 'Green',
		colors: ['#baafa8', '#D4D2AA', '#209159', '#00555A', '#002434'],
	},
	{
		name: 'Black',
		colors: ['#999999', '#555555', '#333333', '#111111', '#000000'],
	},
];

// Timeout for calls to get metadata and images from ipfs
export const IPFS_TIMEOUT = 60000;

export const EXTRA_EARTH_LOCATIONS = [
	{
		label: 'Agartha',
		value: 'agartha',
	},
];

export const PLANET_OPTIONS = [
	{
		label: 'Mercury',
		value: 'mercury',
	},
	{
		label: 'Venus',
		value: 'venus',
	},
	{
		label: 'Earth',
		value: 'earth',
	},
	{
		label: 'Mars',
		value: 'mars',
	},
	{
		label: 'Jupiter',
		value: 'jupiter',
	},
	{
		label: 'Saturn',
		value: 'saturn',
	},
	{
		label: 'Uranus',
		value: 'uranus',
	},
	{
		label: 'Neptune',
		value: 'neptune',
	},
	{
		label: 'Pluto-Charon',
		value: 'pluto',
	},
	{
		label: 'Planet Nine',
		value: 'planet-9',
	},
].sort((a, b) => a.label.localeCompare(b.label));

export const MOON_OPTIONS = [
	{
		label: 'Moon',
		value: 'moon',
	},
];

export const STAR_OPTIONS = [
	{
		label: 'Sun',
		value: 'sun',
	},
];
