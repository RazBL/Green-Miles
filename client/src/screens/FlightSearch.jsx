import { View, StyleSheet, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { Button, Headline, useTheme } from 'react-native-paper';
import { FlightsContext } from '../context/FlightsContext';
import { useContext, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function FlightSearch({ navigation }) {

    const theme = useTheme();

    const { destinationAirports, originAirports, flights, FlightSearchResults, originCities, destinationCities } = useContext(FlightsContext);
    const [passengers, SetPassengers] = useState(1);
    const [date, SetDate] = useState(new Date());
    const [showDatePicker, SetDatePickerVisibility] = useState(false);
    const [selectedLocation, SetSelectedLocation] = useState("");
    const [selectedDestination, SetSelectedDestination] = useState("");
    const [isModalVisible, SetModalVisible] = useState(false);
    const MAX_PASSENGERS = 9;
    const MIN_PASSENGERS = 1;
    const [transformedOriginAirport, SetTransformedOriginAirports] = useState([])
    const [transformedDestinationAirport, SetTransformedDestinationAirports] = useState([])
    const [openOrigin, SetOpenOrigin] = useState(false);
    const [openDestination, SetOpenDestination] = useState(false);
    const [flightNotification, SetFlightNotification] = useState(true);

    const IncrementPassengers = () => {
        if (passengers < MAX_PASSENGERS) SetPassengers(passengers + 1);
    };

    const DecrementPassengers = () => {
        if (passengers > MIN_PASSENGERS) SetPassengers(passengers - 1);
    };

    const DateChange = (event, selectedDate) => {
        if (selectedDate < new Date()) { SetDate(new Date()); }
        else {
            const pureDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            SetDate(pureDate);
        }
        SetDatePickerVisibility(false);
    };

    const HandleFlightSearch = async () => {
        if (!isInputValid()) { return }
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const originAirport = selectedLocation.split(" - ")[0];
        const destinationAirport = selectedDestination.split(" - ")[0];
        let query = {
            destinationAirport: destinationAirport,
            originAirport: originAirport,
            date: formattedDate,
            availableSeats: passengers
        };

        await FlightSearchResults(query);
        navigation.navigate('Flight Search Results', { passengers: passengers });
    }

    const TransformAirports = () => {
        const originDisplayAirports = originAirports.map((airport, index) => {
            return `${airport} - ${originCities[index]}`;
        });

        let data = originDisplayAirports.map(airport => (
            {
                label: airport,
                value: airport
            }
        ));

        SetTransformedOriginAirports(data);

        const destinationDisplayAirport = destinationAirports.map((airport, index) => {
            return `${airport} - ${destinationCities[index]}`;
        });

        data = destinationDisplayAirport.map(airport => ({
            label: airport,
            value: airport
        }));

        SetTransformedDestinationAirports(data);
    };

    const FlightOriginDestinationExists = () => {
        let foundFlight = flights.find(flight => {
            return flight.origin.airport === selectedLocation.slice(0, 3) && flight.destination.airport === selectedDestination.slice(0, 3);
        });

        if (!foundFlight) {
            alert('We have no flight that goes from  ' + selectedLocation + ' to  ' + selectedDestination);
            SetSelectedDestination("");
            SetSelectedLocation("");
        }
    }

    const isInputValid = () => {

        if (!selectedLocation) {
            alert('Please choose a location.');
            return false;
        }
        if (!selectedDestination) {
            alert('Please choose a destination.');
            return false;
        }

        return true;
    }

    useEffect(() => {
        TransformAirports();
    }, []);



    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); SetOpenOrigin(false); SetOpenDestination(false); }}>
            <View style={styles(theme).container}>
                <View style={styles(theme).flightSearch}>

                    <Headline style={styles(theme).headline}>Search for a <Headline style={{ color: theme.colors.primary }}>Flight</Headline></Headline>

                    <View style={styles(theme).searchSection}>
                        <MaterialCommunityIcons
                            name="map-marker"
                            size={25}
                            color="#2B3A4A"
                            style={styles(theme).inputIcon}
                        />
                        <DropDownPicker
                            open={openOrigin}
                            onOpen={() => {
                                SetOpenOrigin(true);
                                SetOpenDestination(false);
                            }}
                            onClose={() => SetOpenOrigin(false)}
                            placeholder='Choose a Location'
                            items={transformedOriginAirport}
                            setOpen={SetOpenOrigin}
                            value={selectedLocation}
                            setValue={SetSelectedLocation}
                            setItems={SetTransformedOriginAirports}
                            onChangeItem={item => SetSelectedLocation(item.value)}
                            textStyle={{ fontSize: 15, color: "#2B3A4A", fontFamily: 'Montserrat_Medium' }}
                            searchable={true}
                            style={styles(theme).input}
                            showArrowIcon={false}
                        />
                    </View>

                    <View style={styles(theme).searchSection}>
                        <MaterialCommunityIcons
                            name="map-marker"
                            size={25}
                            color="#2B3A4A"
                            style={styles(theme).inputIcon}
                        />
                        <DropDownPicker
                            open={openDestination}
                            onOpen={() => {
                                SetOpenOrigin(false);
                                SetOpenDestination(true);
                            }}
                            onClose={() => SetOpenDestination(false)}
                            setOpen={SetOpenDestination}
                            placeholder='Choose a Destination'
                            items={transformedDestinationAirport}
                            value={selectedDestination}
                            textStyle={{ fontSize: 15, color: "#2B3A4A", fontFamily: 'Montserrat_Medium' }}
                            searchable={true}
                            style={styles(theme).input}
                            setValue={SetSelectedDestination}
                            onChangeItem={item => SetSelectedDestination(item.value)}
                            showArrowIcon={false}
                        />
                    </View>
                    <TouchableOpacity style={[styles(theme).searchSection]} onPress={() => SetDatePickerVisibility(true)}>
                        <View style={styles(theme).inputWrapper}>
                            <MaterialCommunityIcons
                                name="calendar"
                                size={25}
                                color="#2B3A4A"
                                style={styles(theme).inputIcon}
                            />
                            <TextInput
                                editable={false}
                                underlineColor="transparent"
                                backgroundColor="white"
                                style={styles(theme).input}
                                placeholder="Choose a Date"
                                value={date.toDateString()}
                            />
                            {showDatePicker && (
                                <DateTimePicker
                                    mode="date"
                                    value={date}
                                    onChange={DateChange}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                    {
                        selectedDestination !== "" && selectedLocation !== "" && flightNotification ? FlightOriginDestinationExists() :
                        null
                    }

                    <TouchableOpacity style={[styles(theme).searchSection]} onPress={() => SetModalVisible(true)}>
                        <View style={styles(theme).inputWrapper}>
                            <MaterialCommunityIcons
                                name="account"
                                size={25}
                                color="#2B3A4A"
                                style={styles(theme).inputIcon}
                            />
                            <TextInput
                                editable={false}
                                underlineColor="transparent"
                                backgroundColor="white"
                                style={styles(theme).input}
                                placeholderTextColor={theme.colors.inputTextColor}
                                placeholder={`${passengers} Passenger${passengers === 1 ? '' : 's'}`}
                            />
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={() => {
                            SetModalVisible(!isModalVisible);
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => SetModalVisible(false)}>

                            <View style={styles(theme).centeredView}>
                                <View style={styles(theme).modalView}>
                                    <View style={{ flexDirection: "column" }}>
                                        <TouchableOpacity onPress={IncrementPassengers}>
                                            <Text style={styles(theme).modalText}>+</Text>
                                        </TouchableOpacity>
                                        <Text style={[styles(theme).modalText]}>{passengers}</Text>
                                        <TouchableOpacity onPress={DecrementPassengers}>
                                            <Text style={styles(theme).modalText}>-</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={[styles(theme).button, styles(theme).buttonClose]}
                                        onPress={() => SetModalVisible(!isModalVisible)}
                                    >
                                        <Text style={styles(theme).textStyle}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <Button
                        mode="flat"
                        contentStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                        }}
                        onPress={HandleFlightSearch}
                        style={styles(theme).searchButton}
                    >
                        <Text style={[{ fontSize: 20, color: 'white' }, { fontFamily: 'Montserrat_Bold' }]}>Search</Text>
                    </Button>
                </View>

            </View>
        </TouchableWithoutFeedback >

    )
}

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    headline: {
        fontSize: 25,
        fontFamily: 'Montserrat_Bold',
        color: 'white',
        alignSelf: 'center',
        marginBottom: 30
    },
    searchSection: {
        marginBottom: 20,
    },
    searchInputField: {
        height: 50
    },
    inputIcon: {
        position: 'absolute',
        left: 20,
        zIndex: 5,
        elevation: 10,
        top: '50%',
        transform: [{ translateY: -12.5 }]
    },
    searchButton: {
        marginTop: 10,
        borderRadius: 25,
        backgroundColor: '#1DBF84',
        borderColor: 'transparent',
    },
    flightSearch: {
        backgroundColor: '#1e272e',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    input: {
        paddingHorizontal: 60,
        zIndex: 1,
        borderRadius: 0,
        borderWidth: 0,
        fontSize: 15,
        fontFamily: "Montserrat_Medium",
        height: 50,
        color: theme.colors.inputTextColor
    },
    inputWrapper: {
        overflow: 'hidden',
        height: 50,
        justifyContent: 'center'
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
        backgroundColor: '#1DBF84',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

