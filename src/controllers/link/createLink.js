import { hash } from '../../utils/hash';
import { LinkModel } from '../../models/linkModel';

export const createLink = async (req, res) => {
  try {
    if (req.body.link) {
      if (req.body.link.match(/(^http(s)?:\/\/\w{2,})\.\w{2,}.*|(^(\w|\d){2,})\.\w{2,}.*/) != null) {
        const link = await new LinkModel({
          originalLink: req.body.link,
          hash: hash(`${req.body.link}:${new Date().getTime()}`)
        }).save();
        res.status(201).send(link);
        return;
      } else {
        res.status(400).send({
          message: 'link is not valid'
        });
        return;
      }
    } else res.status(400).send({
      message: 'link is not valid http(s) link'
    });
  } catch(err) {
    res.status(500).send({
      message: 'error on create link'
    });
  }
};
