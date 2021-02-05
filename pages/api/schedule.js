import Airtable from 'airtable';
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('apphYdFM6kyyOnEt9');

export default (req, res) => {
  const name = 'Yefim from Next';
  const number = req.query.phonenumber;

  console.log('here we gooo');

  if (!name || !number) {
    res.status(200).send('no name or no number');
    return;
  }

  console.log(req.query);
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

    res.status(200).send('');
  });
}
