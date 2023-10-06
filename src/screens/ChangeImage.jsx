import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {Cloudinary} from "@cloudinary/url-gen";

export default function ChangeImage() {
    const [selectedImage, SetSelectedImage] = useState(null);
    const theme = useTheme();
    const cld = new Cloudinary({cloud: {cloudName: 'dh8cvol5m'}});

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need media library permissions to make this work!');
            }
        })();
    }, []);

    const handleImagePick = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true
        });

        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            const base64data = pickerResult.assets[0].base64;
            SetSelectedImage(pickerResult.assets[0].uri);
            await uploadToCloudinary(base64data);  // Send the base64 data directly
        }


    };

    const uploadToCloudinary = async (base64Image) => {
        const data = new FormData();
        data.append('file', `data:image/jpeg;base64,${base64Image}`);
        data.append('upload_preset', 'fo2psvqp');

        try {
            const response = await fetch(`https://greenmiles.onrender.com/api/image/upload`, {
                method: 'POST',
                body: data,
            });
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            if (jsonResponse.secure_url) {
                SetSelectedImage(jsonResponse.secure_url);
            }
        } catch (error) {
            console.error('Upload to Cloudinary failed', error);
        }
    };

    return (
        <View style={styles(theme).container}>
            <TouchableOpacity style={styles(theme).imageContainer} onPress={handleImagePick}>
                {selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles(theme).profileImage} />
                ) : (
                    <Text style={styles(theme).imagePlaceholderText}>Tap to select an image...</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = theme => StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: theme.colors.cardBorder,
        borderWidth: 1,
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholderText: {
        color: theme.colors.cardBorder,
    },
});
