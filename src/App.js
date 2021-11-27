import './App.css';
import {QRScanner} from "./components/QRScanner";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
    return (
        <div className="App">
            <Container maxWidth="md" >
                <Box sx={{my: 4, display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h4" component="h1" gutterBottom >
                        NZ Covid Passport Reader
                    </Typography>
                    <div style={{flexGrow: 2}}>
                        <QRScanner/>
                    </div>
                </Box>
            </Container>
        </div>
    );
}

export default App;
