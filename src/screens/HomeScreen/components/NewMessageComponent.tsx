import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { View } from 'react-native';

//Interface - props | propiedades
interface Props {
    showModalMessage: boolean;
    setShowModalMessage: Function;
}

//interface - fomrulario mensajes
interface FormMessage {
    to: string;
    subject: string;
    message: string;
}

export const NewMessageComponent = ({ showModalMessage, setShowModalMessage }: Props) => {

    const [formMessage, setFormMessage] = useState<FormMessage>({
        to: '',
        subject: '',
        message: ''
    });

    //Función cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string) => {
        setFormMessage({ ...formMessage, [key]: value })
    }

    //Función guardar los mensajes
    const handlerSaveMessage = () => {
        if(!formMessage.to || !formMessage.subject || !formMessage.message){
            return;
        }
        console.log(formMessage);  
        //Almacenar los mensajes en BDD

    }

    return (
        <Portal>
            <Modal visible={showModalMessage} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant='headlineMedium'>Nuevo Mensaje</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon='close-circle-outline'
                            size={30}
                            onPress={() => setShowModalMessage(false)} />
                    </View>
                </View>
                <Divider />
                <TextInput
                    label='Para'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('to', value)} />
                <TextInput
                    label='Asunto'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('subject', value)} />
                <TextInput
                    label='Mensaje'
                    mode='outlined'
                    multiline={true}
                    numberOfLines={7}
                    onChangeText={(value) => handlerSetValues('message', value)} />
                <Button mode='contained' onPress={handlerSaveMessage}>Enviar</Button>
            </Modal>
        </Portal>
    )
}
