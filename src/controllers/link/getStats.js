import { LinkModel } from '../../models/linkModel';
import { ViewLinkModel } from '../../models/viewLinkModel';

export const getStats = async (req, res) => {
  try {
    if (req.params.link) {
      const link = await LinkModel.find({
        hash: req.params.link
      });
      if (link.length === 0) {
        res.status(404).send({
          'message': 'link not found'
        });
        return;
      } else {
        const stats = await ViewLinkModel.find({
          linkId: link[0].id
        });
        res.status(200).send(stats);
      }
    } else {
      res.status(400).send({
        'message': 'link is required in query params'
      });
    }
  } catch(err) {
    res.status(500).send({
      'message': 'error get link'
    });
  }
};
