// themes.ts
import { fadeToWhite } from "../components/CustomUI/utils/colorUtils"

export const monoTheme = {
  background: '#101010',
  fadedBackground: fadeToWhite('#101010'),
  header: '#555454',
  headerBackground: '#555454',
  headerText: '#ffffff',
  headerSubText: '#cccccc',
  titleText: '#f5f5f5',
  subtitleText: '#ffffff',
  outGradientTitle: '#4e4e4e',
  outGradientSubTitle: '#4e4e4e',

  accent: '#FFD54F',

  cardThemes: {
    colorOne: '#404040',
    colorTwo: '#606060',
    colorThree: '#909090',
  },

  calendarThemes: {
    calendarBackground: '#1A1A1A',
    calendarCardBackground: '#2A2A2A',
    calendarActiveBackground: '#555555',
  },
}

export const blueTheme = {
  background: '#93C7FF',
  fadedBackground: fadeToWhite('#93C7FF'),
  header: '#5FA8F0',
  headerBackground: '#5FA8F0',
  headerText: '#06203A',
  headerSubText: '#1E4F7A',
  titleText: '#001e3c',
  subtitleText: '#2E6FA8',
  outGradientTitle: '#002a5d',
  outGradientSubTitle: '#3F7FCC',

  accent: '#FFB703',

  cardThemes: {
    colorOne: '#0D47A1',
    colorTwo: '#1E88FF',
    colorThree: '#4DA3FF',
  },

  calendarThemes: {
    calendarBackground: '#D0E7FF',
    calendarCardBackground: '#A0CFFF',
    calendarActiveBackground: '#5FA8F0',
  },
}

export const greenTheme = {
  background: '#9FE3C0',
  fadedBackground: fadeToWhite('#9FE3C0'),
  header: '#5FBF8F',
  headerBackground: '#5FBF8F',
  headerText: '#0B2F1F',
  headerSubText: '#1F6B4B',
  titleText: '#07321B',
  subtitleText: '#2E8F6A',
  outGradientTitle: '#0A3F26',
  outGradientSubTitle: '#3FAE7C',

  accent: '#FF8F00',

  cardThemes: {
    colorOne: '#1B5E20',
    colorTwo: '#2E7D32',
    colorThree: '#4CAF84',
  },

  calendarThemes: {
    calendarBackground: '#CFFFE0',
    calendarCardBackground: '#9FE3C0',
    calendarActiveBackground: '#5FBF8F',
  },
}

export const pinkTheme = {
  background: '#FFB6D5',
  fadedBackground: fadeToWhite('#FFB6D5'),
  header: '#F47FB2',
  headerBackground: '#F47FB2',
  headerText: '#3A0A1F',
  headerSubText: '#7A1E46',
  titleText: '#4D0F2A',
  subtitleText: '#C84A7F',
  outGradientTitle: '#3A0A1F',
  outGradientSubTitle: '#C84A7F',

  accent: '#3A86FF',

  cardThemes: {
    colorOne: '#880E4F',
    colorTwo: '#D81B60',
    colorThree: '#FF5FA3',
  },

  calendarThemes: {
    calendarBackground: '#FEE2EE',
    calendarCardBackground: '#FFB6D5',
    calendarActiveBackground: '#F47FB2',
  },
}

export const orangeTheme = {
  background: '#FFC28A',
  fadedBackground: fadeToWhite('#FFC28A'),
  header: '#F39C4A',
  headerBackground: '#F39C4A',
  headerText: '#3A1E0A',
  headerSubText: '#7A3A1E',
  titleText: '#4A1F0D',
  subtitleText: '#D9743F',
  outGradientTitle: '#3A1E0A',
  outGradientSubTitle: '#D9743F',

  accent: '#0057D9',

  cardThemes: {
    colorOne: '#BF360C',
    colorTwo: '#E65100',
    colorThree: '#FF8C42',
  },

  calendarThemes: {
    calendarBackground: '#FFE5CC',
    calendarCardBackground: '#FFC28A',
    calendarActiveBackground: '#F39C4A',
  },
}

export const purpleTheme = {
  background: '#C5B6FF',
  fadedBackground: fadeToWhite('#C5B6FF'),
  header: '#8F7FE8',
  headerBackground: '#8F7FE8',
  headerText: '#1E0A3A',
  headerSubText: '#3F1E7A',
  titleText: '#2A0D4C',
  subtitleText: '#6F3FCC',
  outGradientTitle: '#1E0A3A',
  outGradientSubTitle: '#6F3FCC',

  accent: '#00E5FF',

  cardThemes: {
    colorOne: '#311B92',
    colorTwo: '#4A1EA8',
    colorThree: '#7A5FFF',
  },

  calendarThemes: {
    calendarBackground: '#E3DCFF',
    calendarCardBackground: '#C5B6FF',
    calendarActiveBackground: '#8F7FE8',
  },
}

export const themes = {
  mono: monoTheme,
  blue: blueTheme,
  green: greenTheme,
  pink: pinkTheme,
  orange: orangeTheme,
  purple: purpleTheme,
}

export type ThemeName = keyof typeof themes
export type ThemeType = typeof monoTheme
