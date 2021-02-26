declare const styles: {
    defaultTextInputStyle: {
        marginTop: number;
        padding: number;
        justifyContent: "center";
        borderBottomWidth: number;
        width: number;
        fontSize: number;
        marginBottom: number;
    };
    modelOpenViewMain: {
        backgroundColor: string;
        flex: number;
        display: "flex";
        flexDirection: "column";
        alignItems: "center";
        position: "absolute";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        zIndex: number;
        width: number;
        height: number;
    };
    modelOpenViewSub: {
        backgroundColor: string;
        display: "flex";
        flexDirection: "column";
        alignItems: "center";
        height: number;
        width: number;
        paddingBottom: number;
        marginTop: number;
    };
    flatlistIndividualComponent: {
        height: number;
        marginTop: number;
        paddingRight: number;
    };
    flatListIndividualComponentText: {
        fontSize: number;
    };
    loadingView: {
        display: "flex";
        flexDirection: "column";
        justifyContent: "center";
        alignItems: "center";
        height: string;
    };
};
export default styles;
