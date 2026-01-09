import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        textAlign: 'center',
    },
    titleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: '300',
        color: '#111',
        flex: 1,
    },
    arrow: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
    },
});