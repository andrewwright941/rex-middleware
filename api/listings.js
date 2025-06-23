const { getListings } = require('./rex');

module.exports = async function (req, res) {
  try {
    const listings = await getListings();
    res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};