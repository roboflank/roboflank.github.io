import mergeWith from 'lodash/mergeWith';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import DESIGN_SYSTEM_DEFAULT_PALETTE from '@welovedevs/ui/styles/palettes';

import { THEME_SCHEMA } from './theme_schema';
import { transformTheme } from './theme_transforms';

const DEFAULT_PALETTE = Object.freeze(cloneDeep(DESIGN_SYSTEM_DEFAULT_PALETTE));
const PREFERED_THEME = {
    primary: {
        50: '#f6f6ed',
        100: '#edeeda',
        200: '#daddb6',
        300: '#c8cb91',
        400: '#b5ba6d',
        500: '#a3a948',
        600: '#82873a',
        700: '#62652b',
        800: '#41441d',
        900: '#21220e',
        contrastDefaultColor: 'light'
    },
    secondary: {
        50: '#fdf8ea',
        100: '#fbf1d5',
        200: '#f8e3ab',
        300: '#f4d582',
        400: '#f1c758',
        500: '#edb92e',
        600: '#be9425',
        700: '#8e6f1c',
        800: '#5f4a12',
        900: '#2f2509',
        contrastDefaultColor: 'light'
    },
    tertiary: {
        50: '#feeeea',
        100: '#feded6',
        200: '#fcbdad',
        300: '#fb9b83',
        400: '#f97a5a',
        500: '#f85931',
        600: '#c64727',
        700: '#95351d',
        800: '#632414',
        900: '#32120a',
        contrastDefaultColor: 'light'
    },
    dark: {
        50: '#E6E6E6',
        100: '#C1C1C1',
        200: '#979797',
        300: '#6D6D6D',
        400: '#4E4E4E',
        500: '#2F2F2F',
        600: '#2A2A2A',
        700: '#232323',
        800: '#1D1D1D',
        900: '#121212',
        contrastDefaultColor: 'light'
    },
    light: {
        500: '#fff',
        900: '#fff',
        contrastDefaultColor: 'dark'
    },
    danger: {
        50: '#fdeaeb',
        100: '#fbcccc',
        200: '#f8aaaa',
        300: '#f58788',
        400: '#f26e6f',
        500: '#f05455',
        600: '#ee4d4e',
        700: '#ec4344',
        800: '#e93a3b',
        900: '#e5292a',
        A100: '#ffffff',
        A200: '#fff0f0',
        A400: '#ffbdbd',
        A700: '#ffa3a4',
        contrastDefaultColor: 'light'
    },
    safe: {
        50: '#ecf7f0',
        100: '#d0ebda',
        200: '#b1dec1',
        300: '#91d0a8',
        400: '#7ac695',
        500: '#62bc82',
        600: '#5ab67a',
        700: '#50ad6f',
        800: '#46a565',
        900: '#349752',
        A100: '#e1ffea',
        A200: '#aeffc5',
        A400: '#7bffa1',
        A700: '#62ff8f',
        contrastDefaultColor: 'light'
    },
    warn: {
        50: '#fff3e0',
        100: '#ffe0b2',
        200: '#ffcc80',
        300: '#ffb74d',
        400: '#ffa726',
        500: '#ff9800',
        600: '#fb8c00',
        700: '#f57c00',
        800: '#ef6c00',
        900: '#e65100',
        A100: '#ffd180',
        A200: '#ffab40',
        A400: '#ff9100',
        A700: '#ff6d00',
        contrastDefaultColor: 'light'
    },
    orange: {
        50: '#FFF0E9',
        100: '#FFD8C8',
        200: '#FFBFA3',
        300: '#FFA57E',
        400: '#FF9163',
        500: '#FF7E47',
        600: '#FF7640',
        700: '#FF6B37',
        800: '#FF612F',
        900: '#FF4E20',
        contrastDefaultColor: 'light'
    }
};
export const DEFAULT_THEME = Object.freeze({
    palette: PREFERED_THEME,
    miscellaneous: {
        backgroundColor: DEFAULT_PALETTE.dark[50],
        color: DEFAULT_PALETTE.dark[500],
        fontFamily: ['Avenir Next', 'Open Sans', 'Roboto', 'Arial'],
        spacing: 8
    },
    screenSizes: {
        xs: 400,
        small: 500,
        medium: 900
    },
    components: {
        banner: {
            overlayColor: 'primary',
            imageSource: 'https://cdn.filestackcontent.com/8I2wVnCRTFxypXRYLRsp'
        },
        cards: {
            height: 470,
            width: 470,
            borderRadius: 20,
            default: {
                backgroundColor: 'dark',
                color: 'light',
                backBackgroundColor: 'light',
                backColor: 'dark'
            },
            variants: [
                ['primary', 'light', 'light', 'primary'],
                ['tertiary', 'primary', 'light', 'primary'],
                ['light', 'secondary', 'light', 'secondary'],
                ['secondary', 'light', 'light', 'secondary'],
                ['light', 'primary', 'light', 'primary']
            ].map(([backgroundColor, color, backBackgroundColor, backColor]) => ({
                backgroundColor,
                color,
                backBackgroundColor,
                backColor
            }))
        }
    }
});

export const getRandomCardVariant = (theme) => Math.floor(Math.random() * theme.components?.cards?.variants?.length);

const mergeFunction = (objValue, srcValue) => {
    if (isArray(objValue)) {
        return srcValue;
    }
    return merge(objValue, srcValue);
};

export const buildTheme = (theme) => {
    const merged = mergeWith(cloneDeep(DEFAULT_THEME), theme, mergeFunction);
    try {
        THEME_SCHEMA.validateSync(merged, {
            context: { palette: merged?.palette },
            strict: true
        });
        return transformTheme(merged);
    } catch (error) {
        console.error('Invalid theme! Using default theme instead.', { error });
        return transformTheme({ ...DEFAULT_THEME });
    }
};
