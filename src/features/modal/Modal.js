import React, {useState} from 'react';
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab, Stack,
} from "@mui/material";
import {FormContainer, TextFieldElement} from "react-hook-form-mui";
import {useDispatch, useSelector} from "react-redux";
import {closeModal, loginUser, logOff, openModal, registerUser} from "./modalSlice";
import {forms, switchType} from "./formConfigs";
import styles from "./ModalSlice.module.css"

function Modal() {
    const dispatch = useDispatch()

    const modalOpen = useSelector(state => state.modal.open)
    const [modalForm, setModalForm] = useState(forms["Login"]);
    const toggleForm = () => {
        const type = switchType(modalForm.type)
        setModalForm(forms[type])
    }
    const handleClose = () => dispatch(closeModal())
    const handleOpen = () => {
        dispatch(openModal())
    }
    const chooseAction = () => logged ? dispatch(logOff()) : handleOpen()
    const handleSubmit = (data) => {
        if (modalForm["type"] === "Login")
            dispatch(loginUser(data))
        else
            dispatch(registerUser(data))
    }

    const logged = useSelector(state => state.connection.logged)

    function renderFields() {
        const fields = modalForm["fields"].map(field => {
            const type = field.type ? field.type : "text"
            return (<TextFieldElement key={field.name} sx={{mb: 1}} fullWidth name={field.name} label={field.label} type={type}
                                      required/>)
        })
        return (
            <Stack sx={{mt: 2}} direction={'column'}>
                {fields}
            </Stack>
        );
    }

    return (
        <>
            <Dialog open={modalOpen} onClose={handleClose}>
                <FormContainer onSuccess={handleSubmit}>
                    <DialogTitle>{modalForm.type}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {modalForm.content}
                            <u className={styles.link} onClick={toggleForm}>
                                {modalForm.content_link}
                            </u>
                        </DialogContentText>
                        {renderFields()}
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">{modalForm.type}</Button>
                    </DialogActions>
                </FormContainer>
            </Dialog>
            <Fab variant="extended" onClick={chooseAction} color="primary"
                 sx={{position: "fixed", bottom: "2em", right: "2em"}}
                 aria-label="login">
                <PersonRoundedIcon sx={{mr: 1}}/> {logged ? "Log out" : "Login"}
            </Fab>
        </>
    );
}

export default Modal;