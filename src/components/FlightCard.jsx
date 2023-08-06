import { View, Text } from 'react-native'
import React from 'react'
import { Card, Button } from 'react-native-paper';

export default function FlightCard({ flight }) {
    return (
        <Card>
            <Card.Content>

            </Card.Content>
            <Card.Content>
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card.Content>
        </Card>
    )
}
