import {useState} from "react";
import QrReader from 'react-qr-reader';

/**
 * Will open camera to read scan qr code
 * @returns {JSX.Element}
 * @constructor
 */
export const QRScanner = () => {
    const [result, setResult] = useState('No Result');

    const handleScan = (data) => {
        if (data) {
            setResult(data)
            console.log(data);
        }
    }
    const handleError = (err) => {
        console.error(err);
    }
    return (
        <div className="Scanner">
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{width: '100%'}}
            />
            <p>{result}</p>
        </div>
    );
}


QRScanner.propTypes = {};

QRScanner.defaultProps = {};
