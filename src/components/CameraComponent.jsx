import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function CameraComponent() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        try {
            if (cameraRef.current) {
                const { uri } = await cameraRef.current.takePictureAsync();
                console.log(uri);
                setImage(uri);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (hasCameraPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {!image ?
                <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 30
                    }} >
                        <Button icon={() => <MaterialCommunityIcons name="swap-horizontal" size={30} color="white" />}
                        onPress={() => setType(type === Camera.Constants.Type.back ?
                            Camera.Constants.Type.front :
                            Camera.Constants.Type.back
                            )}
                        ></Button>
                        <Button
                            icon={() => (
                                <MaterialCommunityIcons
                                    name={flash === Camera.Constants.FlashMode.off ? "flash-off" : "flash"}
                                    size={24}
                                    color="white"
                                />
                            )}
                            onPress={() => {
                                setFlash(
                                    flash === Camera.Constants.FlashMode.off
                                        ? Camera.Constants.FlashMode.on
                                        : Camera.Constants.FlashMode.off
                                );
                            }}
                        >
                        </Button>

                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            icon="camera"
                            outlined
                            contentStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                height: 50,
                            }}
                            textColor="white"
                            onPress={takePicture}
                        >
                            <Text style={{ fontSize: 15 }}>Take a picture</Text>
                        </Button>
                    </View>
                </Camera> :
                <Image source={{ uri: image }} style={styles.camera} />
            }
            {image ?
                <Button
                    icon="camera"
                    outlined
                    contentStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        height: 50,
                    }}
                    textColor="black"
                    onPress={() => setImage(null)}
                >
                    <Text style={{ fontSize: 15 }}>Take another picture</Text>
                </Button> :
                <Text></Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});
