import { LinkModel } from '../../models/linkModel';
import { ViewLinkModel } from '../../models/viewLinkModel';
import { hash } from '../../utils/hash';
import Bowser from 'bowser';
import geoip from 'geoip-lite';

export const getLink = async (req, res) => {
  try {
    const link = await LinkModel.find({
      hash: req.path.slice(1)
    });
    if (link.length === 0) {
      res.status(404).send({
        'message': 'link not found'
      });
      return;
    } else {
      const ipData = geoip.lookup(req.ip);
      const browser = Bowser.parse(req.headers['user-agent']);
      await new ViewLinkModel({
        linkId: link[0].id,
        timestamp: new Date(),
        agent: browser,
        user: {
          ipHash: hash(req.ip),
          country: 'ipData.country',
          city: 'ipData.city'
        }
      }).save();
      res.redirect(link[0].originalLink);
    }
  } catch(err) {
    res.status(500).send({
      'message': 'error get link'
    });
  }
};
