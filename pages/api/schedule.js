import Airtable from 'airtable';

const VoiceResponse = require('twilio').twiml.VoiceResponse;

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('apphYdFM6kyyOnEt9');

function hangup() {
  const twiml = new VoiceResponse();
  twiml.hangup();
  return twiml;
}

export default (req, res) => {
  const name = 'Yefim from Next';
  const number = req.body.From;
  const recordingUrl = req.body.RecordingUrl;

  console.log('here we gooo');
  console.log(req.body);

  base('People').create([
    {
      fields: {
        'Name': name,
        'Number': number,
      }
    }
  ], (err) => {
    if (err) {
      console.error(err);
    }

    res.setHeader('Content-Type', 'text/xml');
    res.write(hangup().toString());
    res.end();
  });
}
