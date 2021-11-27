import {useState} from "react";
import QrReader from 'react-qr-reader';
import Box from "@mui/material/Box";

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
        <Box className="Scanner" sx={{display: 'flex', flexDirection: 'column'}}>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{maxWidth: '600px', width: '100%', marginLeft: 'auto', marginRight: 'auto'}}
            />
            {result}
        </Box>
    );
}


QRScanner.propTypes = {};

QRScanner.defaultProps = {};
