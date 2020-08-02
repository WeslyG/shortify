import { hash } from '../../utils/hash';
import { LinkModel } from '../../models/linkModel';
import { sendError } from '../../utils/sendError';
import { HOSTNAME } from '../../../config';
import {
  alreadyExistError,
  notValidError,
  linkRequired,
  nameNotValid
} from '../../dict/errorModel';

const URL_REGEXP = /(^http(s)?:\/\/\w{2,})\.\w{2,}.*|(^(\w|\d){2,})\.\w{2,}.*/;

export const checkNameCorrect = name => {
  if (!name) return false;
  name = name.toString();
  if (name.match(/\d+/)) return false;
  if (name.match(/^\w+$/)) return true;
};

export const checkNameFree = async name => {
  if (name === 'stats') return false;
  const res =  await LinkModel.find({
    hash: name
  });
  return res.length === 0;
};

const saveLink = async body => {
  return await new LinkModel({
    originalLink: body.link,
    hash: body.name || hash(`${body.link}:${new Date().getTime()}`),
  }).save();
};

const returnLink = (res, link) => {
  res.status(201).send({
    originalLink: link.originalLink,
    hash: link.hash,
    shortLink: `${HOSTNAME}/${link.hash}`
  });
};

export const createLink = async (req, res) => {
  try {
    if (!req.body.link) return sendError(res, linkRequired);
    if (!URL_REGEXP.test(req.body.link)) return sendError(res, notValidError);
    if (req.body.name) {
      if (!checkNameCorrect(req.body.name)) return sendError(res, nameNotValid);
      if (!await checkNameFree(req.body.name)) return sendError(res, alreadyExistError);
    }
    return returnLink(res, await saveLink(req.body));
  } catch(err) {
    res.status(500).send({
      message: 'error creating the link'
    });
  }
};


