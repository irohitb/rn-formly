import { Dimensions, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    mainImageContainer: {
        width: Dimensions.get('window').width * 0.8,
        maxWidth: Dimensions.get('window').width * 0.8,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
    },
    // Single Image Styling
    imageView: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.3,
        backgroundColor: '#F5F5F5',
    },
    circleView: {
        borderRadius: Math.round(Dimensions.get('window').width * 0.6 +
            Dimensions.get('window').height * 0.3) / 2,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    TextPlusSign: {
        fontSize: 72,
    },
    multipleImageContainerSubChild: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    multipleImageContainerSingleChild: {
        width: 85,
        height: 100,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#F5F5F5',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    multipleImagePlus: {
        fontSize: 32,
    },
    // Multiple Images Styling
});
export default styles;
