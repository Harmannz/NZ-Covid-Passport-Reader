import './App.css';
import {QRScanner} from "./components/QRScanner";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function App() {
    return (
        <div className="App">
            <Container>
                <Box sx={{flexGrow: 1}}>
                    <QRScanner/>
                </Box>
            </Container>
        </div>
    );
}

export default App;
