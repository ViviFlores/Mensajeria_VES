import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import firebase, { updateProfile } from 'firebase/auth';
import { auth } from '../../configs/firebaseConfig';
import { MessageCardComponent } from './components/MessageCardComponent';

//Interface - formulario perfil
interface FormUser {
    name: string;
}

//Interface - Message
interface Message {
    id: string;
    to: string;
    subject: string;
    message: string;
}

export const HomeScreen = () => {

    //hook useState: manipular el formulario del perfil de usuario
    const [formUser, setFormUser] = useState<FormUser>({
        name: ''
    });

    //hook useState: capturar la data del usuario logueado
    const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

    //hook useState: lista de mensajes
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', to: 'Ariel Ron', subject: 'Estudiar', message: 'Estudiar para el jueves!' }
    ]);

    //useEffect: capturar la data del usuario autenticado
    useEffect(() => {
        //Obtener la data del usuario autenticado
        setUserAuth(auth.currentUser);
        //console.log(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? "" })
    }, []);

    //hook useState: mostrar u ocultar el modal
    const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

    //Función para cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string) => {
        setFormUser({ ...formUser, [key]: value })
    }

    //Función actualizar la data del usuario autenticado
    const handlerUpdateUser = async () => {
        await updateProfile(userAuth!, {
            displayName: formUser.name
        });
        setShowModalProfile(false);
    }

    return (
        <>
            <View style={styles.rootHome}>
                <View style={styles.header}>
                    <Avatar.Text size={55} label="MI" />
                    <View>
                        <Text variant='bodySmall'>Bienvenida</Text>
                        <Text variant='labelLarge'>{userAuth?.displayName}</Text>
                    </View>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon="account-edit"
                            size={30}
                            mode='contained'
                            onPress={() => setShowModalProfile(true)}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => <MessageCardComponent />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <Portal>
                <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
                    <View style={styles.header}>
                        <Text variant='headlineMedium'>Mi Perfil</Text>
                        <View style={styles.iconEnd}>
                            <IconButton
                                icon='close-circle-outline'
                                size={30}
                                onPress={() => setShowModalProfile(false)} />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        mode='outlined'
                        label='Nombre'
                        value={formUser.name}
                        onChangeText={(value) => handlerSetValues('name', value)} />
                    <TextInput
                        mode='outlined'
                        label='Correo'
                        value={userAuth?.email!}
                        disabled />
                    <Button mode='contained' onPress={handlerUpdateUser}>Actualizar</Button>
                </Modal>
            </Portal>
            <FAB
                icon="plus"
                style={styles.fabMessage}
                onPress={() => console.log('Pressed')}
            />
        </>
    )
}
