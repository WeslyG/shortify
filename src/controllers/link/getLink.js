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
      const ipData = geoip.lookup(req.host);
      const browser = Bowser.parse(req.headers['user-agent']);
      await new ViewLinkModel({
        linkId: link[0].id,
        timestamp: new Date(),
        agent: browser,
        user: {
          ipHash: hash(req.host),
          country: ipData.country,
          city: ipData.city,
          timezone: ipData.timezone
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
