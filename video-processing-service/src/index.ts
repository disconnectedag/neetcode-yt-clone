import express from 'express';
import {
  convertVideo,
  deleteProcessedVideo,
  deleteRawVideo,
  downloadRawVideo,
  setUpDirectories,
  uploadProcessedVideo,
} from './storage';

setUpDirectories();

const app = express();
app.use(express.json());

/*
 * Every time a video is uploaded into the raw video bucket this endpoint
 * is notified from the message queue
 */
app.post('/process-video', async (req, res) => {
  // Get the bucket and filename from the cloud pub/sub message
  let data;
  try {
    const message = Buffer.from(
      req.body.message.data,
      'base64'
    ).toString('utf8');
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error('Invalid message payload recieved.');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send('Bad request: missing filename');
  }

  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;

  // download the raw video from cloud storage
  await downloadRawVideo(inputFileName);

  // convert video to 360p
  try {
    await convertVideo(inputFileName, outputFileName);
  } catch (err) {
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);
    console.error(err);
    return res
      .status(500)
      .send('Internal Server Error: video processing failed');
  }

  //upload the processed video to cloud storage
  await uploadProcessedVideo(outputFileName);

  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName),
  ]);

  return res.status(200).send('Processed finished successfully');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Video processing service listening at http://localhost:${port}`
  );
});
