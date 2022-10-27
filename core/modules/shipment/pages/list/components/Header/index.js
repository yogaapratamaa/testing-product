/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useRouter } from 'next/router';
import useStyles from '@modules/shipment/pages/list/components/Header/style';
import Button from '@common_button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DropFile from '@common_dropfile';

const HeaderContent = (props) => {
    const { formik, formikImportDeliver,
        showModalDeliver, setShowModalDeliver,
        showModal, setShowModal, handleDropFile, dropFileDeliver } = props;
    const classes = useStyles();
    const router = useRouter();
    const handleExport = (e) => {
        // eslint-disable-next-line no-console
        console.log(e, 'handleExport');
    };
    const handleImport = () => {
        // eslint-disable-next-line no-console
        setShowModal(true);
    };
    const handleImportDeliver = () => {
        setShowModalDeliver(true);
    };
    return (
        <div className={classes.headerContainer}>
            <div className={classes.btns}>
                <Button
                    className={classes.btn}
                    buttonType="secondary"
                    onClick={handleImport}
                    variant="contained"
                >
                    Bulk RTS
                </Button>
                <Button
                    className={classes.btn}
                    buttonType="secondary"
                    // onClick={formikExport.handleSubmit}
                    onClick={handleImportDeliver}
                    variant="contained"
                >
                    Bulk delivered
                </Button>
                <Button
                    className={classes.btn}
                    buttonType="secondary"
                    // onClick={formikExport.handleSubmit}
                    variant="contained"
                // disabled={!formik.values.base64}
                >
                    Export Shipment
                </Button>
            </div>
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
                            Import Shipment CSV
                        </h1>
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
                                className={classes.btnModal}
                                onClick={formik.handleSubmit}
                                variant="contained"
                                disabled={!formik.values.base64}
                            >
                                Submit Import Shipment
                            </Button>
                            <Button
                                buttonType="link"
                                className={classes.btnModal}
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
            <Modal
                className={classes.modal}
                open={showModalDeliver}
                onClose={() => setShowModalDeliver(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showModalDeliver}>
                    <div className={classes.paper}>
                        <h1 className={classes.bodyList}>
                            Import Shipment Deliver
                        </h1>
                        <DropFile
                            singleFile
                            title="Please select the file : "
                            error={(
                                (formikImportDeliver.errors.base64 && formikImportDeliver.touched.base64)
                            )}
                            // error="error"
                            getBase64={dropFileDeliver}
                        />
                        <div className={classes.btnAction}>
                            <Button
                                className={classes.btnModal}
                                onClick={formikImportDeliver.handleSubmit}
                                variant="contained"
                                disabled={!formikImportDeliver.values.base64}
                            >
                                Submit Import Deliver
                            </Button>
                            <Button
                                buttonType="link"
                                className={classes.btnModal}
                                onClick={() => {
                                    setShowModalDeliver(false);
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
