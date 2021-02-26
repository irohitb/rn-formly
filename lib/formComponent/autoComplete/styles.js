import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
    defaultTextInputStyle: {
        marginTop: 50,
        padding: 5,
        justifyContent: 'center',
        borderBottomWidth: 1,
        width: Dimensions.get('window').width * 0.8,
        fontSize: 24,
        marginBottom: 20,
    },
    modelOpenViewMain: {
        zIndex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    modelOpenViewSub: {
        backgroundColor: 'rgba(255,255,255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.4,
        width: Dimensions.get('window').width * 0.9,
        paddingBottom: 10,
        marginTop: Dimensions.get('window').height * 0.1,
    },
    flatlistIndividualComponent: {
        height: 30,
        marginTop: 20,
        paddingRight: 10,
    },
    flatListIndividualComponentText: {
        fontSize: 21,
    },
    loadingView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
    },
});
export default styles;
