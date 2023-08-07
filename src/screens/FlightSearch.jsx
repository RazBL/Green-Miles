import { View, StyleSheet, Text, TouchableOpacity, Modal, TouchableWithoutFeedback , Keyboard } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import { FlightsContext } from '../context/FlightsContext';
import { useContext, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchBar from '../components/SearchBar';



export default function FlightSearch({navigation}) {
    const {destinations, origins, FlightSearchResults } = useContext(FlightsContext);
    const [passangers, SetPassangers] = useState(1);
    const [date, SetDate] = useState(new Date());
    const [showDatePicker, SetDatePickerVisibility] = useState(false);
    const [selectedLocation, SetSelectedLocation] = useState("");
    const [selectedDestination, SetSelectedDestination] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);



    const IncrementPassengers = () => {
        if (passangers < 9) SetPassangers(passangers + 1);
    };

    const DecrementPassengers = () => {
        if (passangers > 1) SetPassangers(passangers - 1);
    };

    const OnChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        SetDatePickerVisibility(Platform.OS === 'ios');
        SetDate(currentDate);
    };


    const HandleFlightSearch = () => {
        const formattedDate = date.toISOString().split('T')[0];

        let query = {
            destination: selectedDestination,
            origin: selectedLocation,
            date: formattedDate,
            availableSeats: passangers
        };

        FlightSearchResults(query);
        navigation.navigate('Flight Search Results');
        }

    const HandleSelectLocation = (location) => {
        SetSelectedLocation(location);
    }

    const HandleSelectDestination = (location) => {
        SetSelectedDestination(location);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.flightSearch}>
                    <View style={styles.searchSection}>
                        <SearchBar
                            data={origins}
                            placeholder={"Choose a Location"}
                            onSelect={HandleSelectLocation}
                            icon={"map-marker"}
                        />
                    </View>
                    <View style={styles.searchSection}>
                        <SearchBar
                            data={destinations}
                            placeholder={"Choose a Destination"}
                            onSelect={HandleSelectDestination}
                            icon={"map-marker"}
                        />
                    </View>
                    <View style={styles.dualSearchSection}>
                        <TouchableOpacity style={[styles.searchSection, { flex: 1 }]} onPress={() => SetDatePickerVisibility(true)}>
                            <TextInput
                                editable={false}
                                icon="calendar"
                                underlineColor="transparent"
                                backgroundColor="white"
                                style={styles.input}
                                placeholder="Choose a date"
                                theme={{
                                    ...DefaultTheme,
                                    colors: {
                                        surfaceVariant: 'white',
                                    },
                                }}
                                left={<TextInput.Icon icon="calendar" />}
                                value={date.toDateString()}
                            />
                            {showDatePicker && (
                                <DateTimePicker
                                    mode="date"
                                    value={date}
                                    onChange={OnChange}
                                />
                            )}
                        </TouchableOpacity>
                        <View style={[styles.searchSection, { flex: 1, marginLeft: 10 }]}>
                            <TouchableOpacity style={[styles.searchSection, { flex: 1 }]} onPress={() => setModalVisible(true)}>
                                <TextInput
                                    editable={false}
                                    icon="account-outline"
                                    underlineColor="transparent"
                                    backgroundColor="white"
                                    style={styles.input}
                                    placeholder={`${passangers} Passenger${passangers === 1 ? '' : 's'}`}
                                    theme={{
                                        ...DefaultTheme,
                                        colors: {
                                            surfaceVariant: 'white',
                                        },
                                    }}
                                    left={<TextInput.Icon icon="account-outline" />}
                                />

                            </TouchableOpacity>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isModalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!isModalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View style={{ flexDirection: "column" }}>
                                            <TouchableOpacity onPress={IncrementPassengers}>
                                                <Text style={styles.modalText}>+</Text>
                                            </TouchableOpacity>
                                            <Text style={[styles.modalText]}>{passangers}</Text>
                                            <TouchableOpacity onPress={DecrementPassengers}>
                                                <Text style={styles.modalText}>-</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!isModalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Done</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>

                        </View>
                    </View>
                    <Button
                        mode="flat"
                        contentStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                        }}
                        onPress={HandleFlightSearch}
                        style={styles.loginButton}
                    >
                        <Text style={[{ fontSize: 15, color: 'black' }, { fontFamily: 'Montserrat_Bold' }]}>Search</Text>
                    </Button>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    defult: {
        fontFamily: 'Montserrat_Medium'
    },
    searchSection: {
        marginBottom: 20
    },
    dualSearchSection: {
        flexDirection: 'row',
    },
    loginButton: {
        marginTop: 15,
        borderRadius: 25,
        backgroundColor: '#95a5a6',
        borderColor: 'transparent',
    },
    flightSearch: {
        backgroundColor: '#1e272e',
        marginLeft: 10,
        marginRight: 10,
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
        borderRadius: 10
    },
    input: {
        borderRadius: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        paddingTop: 50,
        paddingBottom: 50
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Montserrat_Medium',
        fontSize: 30,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        width: 200
    },
    buttonClose: {
        backgroundColor: '#2196F3',

    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',

    },
});
