const VoiceResponse = require('twilio').twiml.VoiceResponse;

export default (req, res) => {
  const twiml = new VoiceResponse();

  twiml.say({voice: 'alice'}, 'Please leave your name and phone number at the beep.');
  twiml.record({
    transcribe: true,
    transcribeCallback: '/api/schedule',
    maxLength: 60
  });

  res.setHeader('Content-Type', 'text/xml');
  res.write(twiml.toString());
  res.end();
}
