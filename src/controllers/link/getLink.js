import { LinkModel } from '../../models/linkModel';
import { ViewLinkModel } from '../../models/viewLinkModel';

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
      await new ViewLinkModel({
        linkId: link[0].id,
        timestamp: new Date(),
        userAgent: req.headers['user-agent'],
        ipAdd: req.ip
      }).save();
      res.redirect(link[0].originalLink);
    }
  } catch(err) {
    res.status(500).send({
      'message': 'error get link'
    });
  }
};
