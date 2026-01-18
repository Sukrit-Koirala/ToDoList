export const monoTheme = {
    background: '#101010',
    header: '#555454',
    headerText: '#ffff',
    headerSubText: '#ffff',
    titleText: '#ffff',
    subtitleText: '#ffffff',
    outGradientTitle: '#101010',
    outGradientSubTitle: '#101010',
    cardThemes:{
        colorOne: '#101010',
        colorTwo: '#404040'
    }
};


export const themes = {
    mono: monoTheme
}

export type ThemeName = keyof typeof themes;
export type ThemeType = typeof monoTheme;