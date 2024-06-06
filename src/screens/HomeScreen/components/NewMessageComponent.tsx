import React from 'react'
import { Modal, Portal, Text } from 'react-native-paper'

export const NewMessageComponent = () => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
        </Portal>
    )
}
