import React from 'react';
import Dropzone from 'react-dropzone/dist';

const MyDropzone = () => {
    // tslint:disable-next-line:no-any
    const onDrop = ( files: any ) => {
        fileToBase64({file: files[0]})
            .then(base64Url => {
                return resizeBase64Img({base64Url});
            })
            .then( (resizedURL: string) => {
                // tslint:disable-next-line:no-console
                console.log(resizedURL.substr(0, 50));
            });
    };
    return (
        <div>
            <Dropzone onDrop={onDrop}>
                Some text
            </Dropzone>
        </div>
    );
};

// tslint:disable-next-line:variable-name
// tslint:disable-next-line:no-any
const fileToBase64 = (params: {file: any}) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            return resolve(reader.result);
        };
        reader.onerror = (error) => {
            return reject(error);
        };
        reader.readAsDataURL(params.file);
    });
};

/**
 * Resize base64 image to width and height,
 * keeping the original image proportions
 * with the width winning over the height
 *
 */
const resizeBase64Img = ({base64Url, width = 50}) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    // tslint:disable-next-line:no-any
    const context = canvas.getContext('2d') as any;
    const img = new Image();

    return new Promise((resolve, reject) => {
        img.onload = () => {
            const imgH = img.height;
            const imgW = img.width;
            const ratio = imgW / imgH;
            canvas.height = width / ratio;
            context.scale(canvas.width / imgW, canvas.height / imgH);
            context.drawImage(img, 0, 0);
            resolve(canvas.toDataURL());
        };

        img.onerror = (error) => {
            reject(error);
        };

        img.src = base64Url;
    });
};

export default MyDropzone;