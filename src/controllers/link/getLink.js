import { LinkModel } from '../../models/linkModel';
import { ViewLinkModel } from '../../models/viewLinkModel';
import { hashString } from '../../utils/hash';
import Bowser from 'bowser';
import geoip from 'geoip-lite';
// import useragent from 'useragent';

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
      const ipData = geoip.lookup(req.hostname);
      // const da = useragent.parse(req.headers['user-agent']);
      // console.log(da);
      const browser = Bowser.parse(req.headers['user-agent']);
      const userInfo = (userGeoIpData, request) => {
        if (userGeoIpData) {
          return {
            ipHash: hashString(request.hostname),
            country: ipData.country,
            city: ipData.city,
            timezone: ipData.timezone
          };
        } else {
          return {
            ipHash: hashString(request.hostname),
            country: 'null',
            city: 'null',
            timezone: 'null'
          };
        }
      };
      await new ViewLinkModel({
        linkId: link[0].id,
        timestamp: new Date(),
        userHash: hashString(`${req.headers['user-agent']}:${req.hostname}`),
        // Useragent add
        agent: browser,
        user: userInfo(ipData, req)
      }).save();
      res.redirect(link[0].originalLink);
    }
  } catch(err) {
    res.status(500).send({
      'message': 'error get link'
    });
  }
};
