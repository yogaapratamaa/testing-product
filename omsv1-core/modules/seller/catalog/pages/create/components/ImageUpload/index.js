/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import { useDropzone } from 'react-dropzone';
import React from 'react';
import Button from '@common_button';
import clsx from 'clsx';
import useStyles from '@sellermodules/catalog/pages/create/components/ImageUpload/style';

const DropFile = (props) => {
    const {
        formatFile = '.csv', getBase64, t, error = false, helperText = '', formik, name = '',
    } = props;
    const classes = useStyles();
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
    });
    const onDropAccepted = async (files) => {
        let filebase64 = [];
        for (let ind = 0; ind < files.length; ind += 1) {
            // eslint-disable-next-line no-await-in-loop
            const baseCode = await toBase64(files[ind]);
            if (baseCode) {
                filebase64 = [
                    ...filebase64,
                    {
                        baseCode,
                        file: files[ind],
                    },
                ];
            }
        }
        getBase64(filebase64);
    };
    const messageError = t('registerseller:File_rejected_Accepted_format_file', { values: { format: formatFile } });
    const {
        getInputProps, open,
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDropAccepted,
        accept: formatFile,
        onDropRejected: () => window.toastMessage({
            open: true,
            text: messageError,
            variant: 'error',
        }),
        multiple: false,
    });

    return (
        <div>
            <div>
                <input {...getInputProps()} />
                {error && <div className={classes.errorText}>{helperText}</div>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {formik.values[name]?.map((image, idx) => (
                    <div className={classes.imgGroup} style={{ display: image.is_deleted ? 'none' : 'unset' }}>
                        <div className={classes.imgContainer}>
                            <img
                                key={image.position}
                                className={classes.img}
                                src={image.id ? image.url : image.binary}
                                alt="media_img"
                            />
                            <img
                                src="/assets/img/trash.svg"
                                alt="delete"
                                className={classes.trashIcon}
                                onClick={() => {
                                    if (image.id) {
                                        formik.setFieldValue(`[${name}][${idx}].is_deleted`, true);
                                    } else {
                                        const temp = formik.values[name];
                                        temp.splice(idx, 1);
                                        formik.setFieldValue(name, temp);
                                    }
                                }}
                            />
                        </div>
                        <div className={classes.fileName}>
                            {image.name}
                            <br />
                            {image.size}
                        </div>
                        <div className={classes.typeContainer}>
                            {image.types?.map((type) => (
                                <div className={classes.labelType}>{type?.split('_').join(' ')}</div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className={classes.imgGroup}>
                    <Button className={clsx(classes.btn, error && 'error')} type="button" onClick={open} fullWidth>
                        <img className={classes.icon} src="/assets/img/file.svg" alt="" />
                        <div className={classes.textFile}>
                            {formik.values[name]?.length ? `Photo ${formik.values[name].length + 1}` : t('common:Main_Photo')}
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DropFile;
