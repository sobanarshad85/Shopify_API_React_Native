import { StyleSheet } from 'react-native';
import color from '../../resources/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
    },
    textStyle: {
        color: color.background,
        fontSize: 18,
        flex: 1
    },
    textStyle1: {
        color: color.background,
        fontSize: 16,
        flex: 1
    },
});

export default styles;