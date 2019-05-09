import { StyleSheet } from 'react-native';
import color from '../../resources/colors'

 const styles: any = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.white,
    },
    textColor:{ 
        color: color.background 
    }
});

export default styles;