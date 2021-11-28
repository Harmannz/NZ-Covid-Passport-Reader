import {useState} from "react";
import QrReader from 'react-qr-reader';
import Box from "@mui/material/Box";
import {verifyPassURIOffline} from "@vaxxnz/nzcp";
import moment from "moment";

/**
 * Will open camera to read scan qr code
 * @returns {JSX.Element}
 * @constructor
 */
export const QRScanner = () => {
    const [result, setResult] = useState("");

    const handleScan = (data) => {
        if (data) {
            const response = verifyPassURIOffline(data);
            if (!response.violates) {
                const age = moment().diff(moment(new Date(response.credentialSubject.dob)).format("DD/MM/YYYY"), 'years');
                const result = {
                    valid: response.success,
                    familyName: response.credentialSubject.familyName,
                    age,
                }
                setResult(JSON.stringify(result));
            }
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
