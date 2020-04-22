export const sendError = (res, err) => {
  if (err.body) {
    res.status(err.status).send(err.body);
  } else if (err.message)
    res.status(err.status).send({
      message: err.message
    });
  else {
    res.status(400).send({
      message: 'Error model has error'
    });
  }
};
