'use strict';

const errors = require('../errors');
const sessionService = require('../services/sessions');

exports.create = (req, res, next) => {
  const session = req.body
    ? {
        email: req.body.email,
        token: req.body.token
      }
    : {};

  return sessionService
    .create(session)
    .then(u => {
      res.status(201);
      res.end();
    })
    .catch(err => {
      next(errors.defaultError(err));
    });
};

exports.logout = (req, res, next) => {
  return sessionService
    .isValid(req.body.email, req.headers.authorization)
    .then(() => {
      return sessionService.delete(req.body.email, req.headers.authorization).then(() => {
        res.status(201);
        res.end();
      });
    })
    .catch(err => {
      next(errors.defaultError(err));
    });
};

exports.logoutAll = (req, res, next) => {
  return sessionService
    .isValid(req.body.email, req.headers.authorization)
    .then(() => {
      return sessionService.deleteAll(req.body.email, req.headers.authorization).then(() => {
        res.status(201);
        res.end();
      });
    })
    .catch(err => {
      next(errors.defaultError(err));
    });
};