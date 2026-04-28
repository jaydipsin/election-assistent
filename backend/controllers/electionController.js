const electionData = require('../config/electionData');

exports.getElectionConfig = (req, res) => {
  const { type } = req.params;
  const config = electionData[type];

  if (!config) {
    return res.status(404).json({ error: 'Election type not found' });
  }

  res.json(config);
};
