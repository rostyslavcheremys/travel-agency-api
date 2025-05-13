const TravelAgencyApplication = require('./src/App');

const app = TravelAgencyApplication.run();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} at ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Kiev' })}`);
});