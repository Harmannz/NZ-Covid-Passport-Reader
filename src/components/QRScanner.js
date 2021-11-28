import {useState} from "react";
import QrReader from 'react-qr-reader';
import Box from "@mui/material/Box";
import {covidCodeVerifier} from "../covid-pass-verifier/verifier";

/**
 * Will open camera to read scan qr code
 * @returns {JSX.Element}
 * @constructor
 */
export const QRScanner = () => {
    const [result, setResult] = useState('No Result');

    const handleScan = async (data) => {
        if (data) {
            const response = await covidCodeVerifier(data)
            setResult("" + response);
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
