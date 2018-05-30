import env from 'dotenv';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import uuidv1 from 'uuid/v1';
import { MediaModel } from '../models';
import MiddleWares from './../middleware/index';

env.config();
const middleware = new MiddleWares();


const uploadPoster = (req, res) => {
  // set upload directory
  const directory = path.resolve('storage/app/public/recipes/');
  const form = new formidable.IncomingForm();
  let poster = '';
  form.parse(req, (err, fields, files) => {
    const oldpath = files.poster.path;
    const uuid = uuidv1();
    const originalFilename = files.poster.name;
    const ext = path.extname(originalFilename);
    const newpath = path.join(directory, `${uuid + ext}`);
    poster = `${uuid + ext}`;
    const fileSize = files.poster.size;
    fs.rename(oldpath, newpath, (err) => {
      if (err) {
        throw err;
      }
      MediaModel.create({
        userId: req.decoded.id,
        source: `uploads/recipes/${poster}`,
        filename: originalFilename,
        filesize: fileSize
      }).then((output) => {
        res.json({
          status: 'success',
          message: 'File uploaded successfully',
          poster_path: `uploads/recipes/${poster}`,
          media: output
        });
      }).catch(error => middleware.parseSequelizeError(res, error));
    });
  });
};
const getAllMedia = (req, res) => {
  let defaultOffset = 0;
  if (req.query.offset) {
    defaultOffset = req.query.offset;
  }
  MediaModel.findAll({
    where: {
      userId: req.decoded.id,
    },
    limit: 8,
    offset: defaultOffset,
    order: [
      ['createdAt', 'ASC'],
    ]
  }).then((response) => {
    res.json({
      status: 'success',
      data: response
    });
  }).catch(error => middleware.parseSequelizeError(res, error));
};
const allMethods = {
  uploadPoster,
  getAllMedia
};
export default allMethods;
