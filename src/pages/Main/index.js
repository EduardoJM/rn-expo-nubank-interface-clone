import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { Container, Content, Card, CardHeader, CardContent, CardFooter, Title, Description, Annotation } from './styles';

import Header from '../../components/Header';
import Tabs from '../../components/Tabs';
import Menu from '../../components/Menu';

export default function Main() {
    let offset = 0;
    const translateY = new Animated.Value(0);

    const animatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationY: translateY
                }
            }
        ],
        { useNativeDriver: true },
    );

    function onHandlerStateChange(event) {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            let opened = false;
            const { translationY } = event.nativeEvent;
            offset += translationY;

            if (translationY >= 80) {
                opened = true;
            } else {
                translateY.setValue(offset);
                translateY.setOffset(0);
                offset = 0;
            }
            Animated.timing(translateY, {
                toValue: opened ? 260 : 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                offset = opened ? 380 : 0;
                translateY.setOffset(offset);
                translateY.setValue(0);
            });
        }
    }

    return (
        <Container>
            <Header />

            <Content>
                <Menu translateY={translateY} />

                <PanGestureHandler
                    onGestureEvent={animatedEvent}
                    onHandlerStateChange={onHandlerStateChange}
                >
                    <Card style={{
                        transform: [{
                            translateY: translateY.interpolate({
                                inputRange: [-360, 0, 320],
                                outputRange: [-30, 0, 320],
                                extrapolate: 'clamp',
                            }),
                        }]
                    }}>
                        <CardHeader>
                            <MaterialIcons name="attach-money" size={28} color="#666" />
                            <MaterialIcons name="visibility-off" size={28} color="#666" />
                        </CardHeader>
                        <CardContent>
                            <Title>Saldo Disponível</Title>
                            <Description>R$ 197.611,65</Description>
                        </CardContent>
                        <CardFooter>
                            <Annotation>
                                Transferência de R$ 20,00 recebida de Eduardo Oliveira hoje às 06:00h
                            </Annotation>
                        </CardFooter>
                    </Card>
                </PanGestureHandler>
            </Content>

            <Tabs translateY={translateY} />
        </Container>
    );
}
