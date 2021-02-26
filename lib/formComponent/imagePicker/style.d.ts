declare const styles: {
    mainImageContainer: {
        width: number;
        maxWidth: number;
        marginTop: number;
        display: "flex";
        alignItems: "center";
    };
    imageView: {
        width: number;
        height: number;
        backgroundColor: string;
    };
    circleView: {
        borderRadius: number;
        display: "flex";
        alignItems: "flex-end";
        justifyContent: "flex-end";
    };
    TextPlusSign: {
        fontSize: number;
    };
    multipleImageContainerSubChild: {
        display: "flex";
        flexDirection: "row";
        flexWrap: "wrap";
        alignItems: "center";
    };
    multipleImageContainerSingleChild: {
        width: number;
        height: number;
        marginLeft: number;
        marginRight: number;
        marginTop: number;
        marginBottom: number;
        backgroundColor: string;
        display: "flex";
        alignItems: "flex-end";
        justifyContent: "flex-end";
    };
    multipleImagePlus: {
        fontSize: number;
    };
};
export default styles;
