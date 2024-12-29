import { FileFilterCallback, diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

export const storage = diskStorage({
  destination: './public/uploads',
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});

export const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  const allowedMimeTypes = [
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/rtf',
    'application/vnd.oasis.opendocument.text',
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',

    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',

    'video/mp4',
    'video/x-msvideo',
    'video/webm',
    'audio/webm',
    'video/x-matroska',
    'video/quicktime',
    'video/x-ms-wmv',

    'application/zip',
    'application/vnd.rar',
    'application/x-7z-compressed',
    'application/x-tar',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new BadRequestException(
        'Only files with the following mime types are allowed: image/jpeg, image/png, image/gif, audio/webm, application/pdf',
      ),
    );
  }
  callback(null, true);
};
