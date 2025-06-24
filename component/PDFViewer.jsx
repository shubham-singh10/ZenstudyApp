import React from 'react';
import { Dimensions, View, StyleSheet, Alert } from 'react-native';
import Pdf from 'react-native-pdf';

export default function PDFViewer() {
    const source = {
        uri: 'https://zenstudy-videos.s3.ap-south-1.amazonaws.com/Notes/Test_Course/testing_the_module_Data/Test_ssl/Test',
        cache: true,
    };

    return (
        <View style={styles.container}>
            <Pdf
                source={source}
                style={styles.pdf}
                enablePaging={false}  // Scroll continuously
                enableAnnotationRendering={false} // Disable annotation rendering
                trustAllCerts={false}
                scale={1.0}
                minScale={1.0}
                maxScale={3.0}  // Allow zoom between 1x and 3x
                onError={(error) => {
                    Alert.alert(
                        'Error',
                        'Unable to display PDF. Returning to previous screen.',
                        [
                            {
                                text: 'OK',
                                // onPress: () => navigation.goBack(),
                            },
                        ],
                        { cancelable: false }
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
});
