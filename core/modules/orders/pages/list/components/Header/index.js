/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import useStyles from '@modules/orders/pages/list/components/Header/style';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DropFile from '@common_dropfile';
import TenantListInput from '@common_tenantlistinput';
import Button from '@common_button';

const HeaderContent = ({ props }) => {
    const { formik, handleDropFile,

        showModal, setShowModal,
    } = props;
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <Modal
                className={classes.modal}
                open={showModal}
                onClose={() => setShowModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showModal}>
                    <div className={classes.paper}>
                        <h1 className={classes.bodyList}>
                            Import Order CSV
                        </h1>
                        <TenantListInput className={classes.fieldRoot} style={{ marginBottom: '10px' }} />
                        <DropFile
                            singleFile
                            title="Please select the file : "
                            error={(
                                (formik.errors.base64 && formik.touched.base64)
                            )}
                            // error="error"
                            getBase64={handleDropFile}
                        />
                        <div className={classes.btnAction}>
                            <Button
                                className={classes.btn}
                                onClick={formik.handleSubmit}
                                variant="contained"
                                disabled={!formik.values.base64}
                            >
                                Submit Import Order
                            </Button>
                            <Button
                                buttonType="link"
                                className={classes.btn}
                                onClick={() => {
                                    setShowModal(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default HeaderContent;
