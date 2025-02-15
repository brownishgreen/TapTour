import { Storage } from '@google-cloud/storage';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

export const uploadToGCS = (file, callback) => {
  if (!file) return callback(new Error('No file uploaded'));

  const fileName = `uploads/${Date.now()}_${file.name}`;
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => callback(err));
  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${process.env.GCLOUD_STORAGE_BUCKET}/${fileName}`;
    callback(null, publicUrl);
  });

  blobStream.end(file.data);
};
