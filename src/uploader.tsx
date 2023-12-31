import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Document, Page } from 'react-pdf';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

/**
 * RefObject type interface
 */
interface RefObject<T> {
    readonly current: T | null;
}

/**
 * UploadFile interface
 */
interface IUploadFile {
    /**
     * Function passes the Item selected
     * @param value
     */
    handleFile(any): void;
}

const fileUploadStatus = {
    UPLOADING: 'UPLOADING',
    START: 'PROCESSING',
    COMPLETED: 'COMPLETED'
}

/**
 * UploadFile Functional component implementation
 */
const UploadFile: FC<IUploadFile> = ({ handleFile }) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const hiddenFileInput: RefObject<any> = React.useRef(null);
    const [status, setStatus] = useState('UPLOADING');
    const dropRef: RefObject<any> = React.createRef();
    const [fileName, setFileName] = useState();
    const [fileSize, setFileSize] = useState('');

    // Drag&Drop methods
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        debugger;
    };
    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            const fileUploaded = e.dataTransfer.files[0];
            console.log('from handleDragIn', fileUploaded)
            // onUpload(fileUploaded, true);
        }
    };
    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            console.log('from handleDrop')
            const fileUploaded = e.dataTransfer.files[0];
            onUpload(fileUploaded, false);
        }
    };

    // Event handling
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        onUpload(fileUploaded, false);
    };


    const onUpload = (fileUploaded, isDragging: boolean) => {
        console.log('fileUploaded', fileUploaded);
        setIsDragging(isDragging);
        //SetFileDetail
        const formatFileSize = `${(fileUploaded.size / 1048576).toFixed(2)} MB`;
        const fileName = fileUploaded.name.trim();
        setFileName(fileName);
        setFileSize(formatFileSize);
        const fileExtension = fileName.split(".").pop().toLowerCase();
        // Making call

        if (fileExtension === 'txt') {
            TxtToJson(fileUploaded)
        } else if (fileExtension === 'pdf') {
            // PdfToJson(fileUploaded)
            TxtToJson(fileUploaded)
        }


    }

    const onDownload = (params: string) => {
        console.log('downloading',)
    }

    const PdfToJson = (uploadFile) => {
        const reader: FileReader = new FileReader();
        const formData = new FormData();
        formData.append('file', uploadFile);
        reader.onload = (e) => {
            const data = reader.result;
            const content = JSON.stringify(data);
            console.log('Upload PDF Json', JSON.parse(content))
        };
        reader.onerror = () => {
            console.log('Error')
        };
        reader.readAsBinaryString(uploadFile);
        setStatus('COMPLETED');
        //reserved fn
    }

    const TxtToJson = (uploadFile) => {
        const reader: FileReader = new FileReader();
        const url = 'https://jolly-tree-16f0e16d9ad14d3fb6f6c77cf1698621.azurewebsites.net/upload'
        const url2 = 'http://127.0.0.1:5000/upload';
        const url3 = 'http://127.0.0.1:5000/health';

        const formData = new FormData();
        formData.append('file', uploadFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        setStatus('STARTED');
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
       

            const jsonStr = JSON.stringify(response.data, null, 2);

            // Create a blob from the string
            const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
        
            // Create a URL for the blob
            const url = URL.createObjectURL(blob);
        
            // Create a link and programmatically click it to initiate download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'data.txt';
            link.click();
        
            // Afterwards, revoke the object URL to avoid memory leaks
            URL.revokeObjectURL(url);


            setStatus('COMPLETED');
        }).catch(
            err => console.log('getUploadRep', err)
        )
        // reader.onload = (e) => {
        //     const data = reader.result;
        //     const content = JSON.stringify(data);
        //     console.log('Upload txt Json', JSON.parse(content))
        //     setStatus('STARTED');

        //     axios.post(url2, uploadFile, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     }).then(
        //         response => {
        //             setStatus('COMPLETED');
        //             console.log('getUploadRep', response)
        //         }
        //     ).catch(
        //         err => console.log('getUploadRep', err)
        //     )
        // };
        // reader.onerror = () => {
        //     console.log('Error')
        // };
        // reader.readAsBinaryString(uploadFile);

    }

    // Set and remove eventListeners during mount and unmount
    useEffect(() => {
        const div: HTMLDivElement = dropRef.current;
        div.addEventListener('dragenter', handleDragIn);
        div.addEventListener('dragleave', handleDragOut);
        div.addEventListener('dragover', handleDrag);
        div.addEventListener('drop', handleDrop);
        return function cleanup() {
            div.removeEventListener('dragenter', handleDragIn);
            div.removeEventListener('dragleave', handleDragOut);
            div.removeEventListener('dragover', handleDrag);
            div.removeEventListener('drop', handleDrop);
        };
    });
    return (
        <div ref={dropRef} >
            {status === 'START' &&
                <div style={styles.center}>
                    <Text> 1. We are upLoading you  {fileName} ({fileSize})</Text><br />
                    <div style={styles.center}>
                        <CircularProgress />
                    </div>
                </div>
            }
            {status === 'COMPLETED' &&
                <div style={styles.center}>
                    <Text>Successful! </Text><br />
                    <Text>{fileName}</Text>
                    <button
                        data-testid={'uploadTestBtn'}
                        style={styles.btn}
                        onClick={() => onDownload(fileName)}
                    >
                        Download
                    </button>
                </div>
            }
            {status === 'UPLOADING' &&
                <div
                    data-testid="container"
                    style={isDragging ? styles.draggedContainer : styles.container}
                >
                    <div style={styles.uploadButtonContainer}>
                        {/* <UploadFileIcon /> */}
                    </div>
                    <p style={styles.text}>Drag and drop files here</p>
                    <button
                        data-testid={'uploadTestBtn'}
                        style={styles.selectFileButton}
                        onClick={handleClick}
                    >
                        Select File
                    </button>
                    <input
                        data-testid="fileInput"
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        accept=".txt, .pdf"
                        style={{ display: 'none' }}
                    />
                </div>}
        </div>
    );
};

export default UploadFile;



const styles = StyleSheet.create({
    draggedContainer: {
        width: '40%',
        height: '240px',
        border: 'dashed 1px #0055cb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: .5,
        marginLeft: '30%',
    },
    container: {
        maxWidth: 750,
        height: 240,
        border: 'dashed 1px #2E3B55',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        backgroundColor: 'rgba(255,255,255, 0.5)',
        //        color:'transparent',
        //        opacity:'40%',
        //        filter:invert(1),
        borderRadius: 'var(--muidocs-shap-borderRadius, 10px)'
    },
    uploadButtonContainer: {
        width: 60,
        height: 60,
        marginLeft: '43%'
    },
    text: {
        margin: 'auto',
        height: '18px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#2E3B55',
    },
    selectFileButton: {
        margin: 'auto',
        alignSelf: 'center',
        cursor: 'pointer',
        color: '#0071e9',
        backgroundColor: 'white',
        border: 'solid 1px #0071ef',
        height: '45px',
        width: '120px',
        textTransform: 'capitalize',
        fontSize: '15px',

    },
    uploadButtons: {
        display: 'flex',
        justifyContent: 'center',
    },
    center: {
        textAlign: 'center',
        color: '#0071e9',
        textTransform: 'capitalize',
        fontFamily: 'Roboto, Arial',
        fontSize: 20,
        padding: 5,
        paddingTop: 30
    },
    btn: {
        cursor: 'pointer',
        color: '#0071e9',
        backgroundColor: 'white',
        border: 'solid 1px #0071ef',
        height: '45px',
        width: '100px',
        textTransform: 'capitalize',
        fontSize: '15px',
        margin: 20
    }
});
