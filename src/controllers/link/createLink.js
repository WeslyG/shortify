import { hash } from '../../utils/hash';
import { LinkModel } from '../../models/linkModel';

const checkNameFree = async name => {
  if (name === 'stats') return false;
  if ((name.match(/^\w+$/))) {
    const res = await LinkModel.find({
      hash: name
    });
    return res.length === 0 ? true : false;
  } else {
    return false;
  }
};

const saveLink = async (link, name) => {
  return await new LinkModel({
    originalLink: link,
    hash: name || hash(`${link}:${new Date().getTime()}`)
  }).save();
};

export const createLink = async (req, res) => {
  try {
    if (req.body.link) {
      if (req.body.link.match(/(^http(s)?:\/\/\w{2,})\.\w{2,}.*|(^(\w|\d){2,})\.\w{2,}.*/) != null) {
        if (req.body.name) {
          const nameFree = await checkNameFree(req.body.name);
          if (nameFree) {
            const link = await saveLink(req.body.link, req.body.name);
            res.status(201).send(link);
            return;
          } else {
            res.status(400).send({
              'message': 'name already exist'
            });
          }
        } else {
          const link = await saveLink(req.body.link);
          res.status(201).send(link);
          return;
        }
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


