import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { UsersContext } from '../context/UsersContext';

export default function ChangeImage() {
    const [selectedImage, SetSelectedImage] = useState(null);
    const theme = useTheme();
    const {UploadProfilePicture, currentUser} = useContext(UsersContext);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need media library permissions to make this work!');
            }
        })();
        if(currentUser)
            SetSelectedImage(currentUser.image)
    }, [currentUser]);

    const handleImagePick = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            width: 800,
            quality: 0.5,
            base64: true
        });
    
        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            SetSelectedImage(pickerResult.assets[0].uri);
            await uploadToCloudinary(pickerResult.assets[0].uri);
        }
    };

    const uploadToCloudinary = async (imageUri) => {
        let formData = new FormData();
        formData.append('image', {
            uri: imageUri,
            name: 'profile.jpg',
            type: 'image/jpg'
        });
    
        try {
            const response = await fetch(`https://greenmiles.onrender.com/api/image/upload`, {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error("Failed to upload image");
            } else {
                const data = await response.json();
                console.log(data);
                UploadProfilePicture(data.secure_url);
            }
        } catch (error) {
            console.error('Upload to Cloudinary failed', error);
        }
    };


    return (
        <View style={styles(theme).container}>
            <TouchableOpacity style={styles(theme).imageContainer} onPress={handleImagePick}>
                    <Image source={{ uri: selectedImage }} style={styles(theme).profileImage} />
                    <Text style={styles(theme).imagePlaceholderText}>Tap to select an image...</Text>
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
        position:'relative'
    },
    profileImage: {
        width: '100%',
        height: '100%',
        opacity: 0.7
    },
    imagePlaceholderText: {
        position: 'absolute',
        fontFamily: 'Montserrat_Medium',
        fontSize: 12
    },
});
