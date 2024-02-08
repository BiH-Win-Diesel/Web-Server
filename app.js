const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient({
    credentials : {
        client_email : 'img-758@nth-mantra-410703.iam.gserviceaccount.com',
        private_key : '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD1Wnq4Xo8mZWGQ\nhg4NC8JAq3DwQ09L4gNLaom94aTI6Fvo2LRIrfSkHFKGyvtBpnZ1vg+AW/WBc/Rn\na3+ue9qcrTj5GQoiOUT0pR6f/ToQOZBHM2YQ0q4xH0b21AlRaFP/7Vx8NAjfTuHw\nBz8hMjbqL8F5aOmGD74eelCoZqrWBqgwII6HA+6O5dcywCUYKYqEzeEvcEhLN4hy\nRKHQEdYjsq14KUv+Dwrt77vjuT7n9R51ThJIt76Cy7BpODZ1JiV9FGJbLdalL1aW\najXxbkIdVMblG2maWZXI9ngZtxjUNieVWkd0fy75vMhABYl+a3KS+rObH0AvsdCh\nCocOcxLrAgMBAAECggEACjykMinmPx8SJ9cjO76DdFjmDwamU4j/XWSS93rN4IDe\nLnDpB/J6HcuXH38ImX/TuxK0nHgGkXtZ2/0x1QEStfn921oE5wVzFkhtZq97sYGb\nvqmRijiM6NYtPjWXZ4lUaxean3QF8STeOG2U+YWaCCgsVZLf0dm5gC89fkk9h4B0\nShaFFlNM+BEEuR+3tkC7ZVTp2r3aB3pjbxHgFSxYl46X8P9c9Ojpx5wXmDhi5Ic5\nFqI8dgd7NuJlVHP6grd1+oTmyT0JNsb/lxftJkBBgMT9CI7wbvq0OsvUGnmR6D6L\nXIQLezmOn8KTDwzYR8rmoBo0kEABUH/NG4qVasZBAQKBgQD7nXairSdq6RrHL+En\n76SM1rMCe8M81MZLUHf/TydLIsqLuhE47VgG6jwnZ0DAAKADNbghDxs0sYdNdOuG\nD4jZd7yYrCXozdKkei7qY2bFv73v2bcaVVLGKH8Q/Pal57ABdQ2RE35flonv4Egq\nQxZPrM6VD/jbRwNGFVIWpYRg+wKBgQD5oRSnFz249YXbrpHqeV4KJQNto4aM1gwn\nbMyQd6nkENx+p2PpnxHqDQnJaNlr3nI9c9pCPUlvdOrdJSj8KmkaZzBrVktB0aZl\n5LPus97qEcjHGKa50bCtjsj+kHYwi2oZaBtuGKE3q+MKQOQU8tVb/VAVLRmqN4T4\n7nbjjNbS0QKBgF9ComO8gqvrTQQUkH36MKZRsrxB9wzU0a457PRwF0RPC7gS3epb\nkXQswlF4uf73PZ15fRinC3nLrJoapgC/aORMfM6gfknBgvpad+CteX9stJBWMQh7\nPTdgpZrc6tSs/unOUzCV3MZ7zAVROIEnnQ7VMfElduYt4INsFwQT7iZ5AoGALupM\nNF8U1ZcnUjNL7zJiLyvnqgpqtjtgS2SSSbCDuH5GwnL5PyYLOt66cSUIf9JtzAjj\nA0H7dDwYC/n46vOZj0HHgtTUDgm16T6DZqBdi8ZN4sVKSHAVcXj9Y4KJA/Sfuyiq\nxxVP72OZpwqtExbUbJZ+H4y7XxdSIWrH41pL4ZECgYAGKdU7yt+4gHiJdxF460Lo\nzjuUgAU6FNLxgkyuqAJ5l2iyjxJpaWcyZQ4ACBi0f7bwcuZTq6X26GnxHVwEADF3\nbpYmouT4nrQOiY0q/39Uy5/5gb94f9OyisrxsQuHCIJ13f5thrPNqviJ2KflZx2w\nqBTxhGYckF/2DpxFy/0TmA==\n-----END PRIVATE KEY-----\n'
    }
});

async function quickstart() {
  const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

  const audio = {
    uri: gcsUri,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
  console.log(`Transcription: ${transcription}`);
}

quickstart();