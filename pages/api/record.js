const VoiceResponse = require('twilio').twiml.VoiceResponse;

export default (req, res) => {
  const twiml = new VoiceResponse();

  twiml.say({voice: 'alice'}, 'Please leave your name and phone number at the beep.');
  // https://www.twilio.com/docs/voice/twiml/record
  twiml.record({
    timeout: 0, // disable ending the record after X seconds of silence
    transcribe: true,
    transcribeCallback: '/api/schedule',
    maxLength: 60, // seconds
    playBeep: true,
  });
  twiml.hangup();

  res.setHeader('Content-Type', 'text/xml');
  res.write(twiml.toString());
  res.end();
}
