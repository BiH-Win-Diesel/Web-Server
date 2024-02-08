import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useFileUpload } from "@/app/hooks/lib/uploadImage";
import { MicNoneRounded, MicSharp } from "@material-ui/icons";

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const VoiceUploader = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [flag, setFlag] = useState(false);
  const [stream, setStream] = useState([]);
  const uploadFile = useFileUpload();

  useEffect(() => {
    async function handling() {
      let chunks = [];
      if (mediaRecorder == null) return;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = async (e) => {
        var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        const filename = `${rString}.wav`;
        const path = "voice/"
        const blob = new Blob(chunks, { type: "audio/wav" });
        const file = new File([blob], filename, { type: "audio/wav" });
        let uploadOk = await uploadFile(filename, file, path);

        if(uploadOk){
          const url = `https://storage.googleapis.com/hackathon-bucket-123/${path}${filename}`;
          const response = await fetch(`/api/voice/?url=${url}`);
          const r = await response.json();
          console.log(r)
        }else{
          alert("Upload failed!")
        }
      };
    }

    handling();
  }, [mediaRecorder]);

  function voiceStartHandler() {
    let mediaRecorder;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      setStream(stream);
      mediaRecorder.start();
      setMediaRecorder(mediaRecorder);
    });
  }

  function voiceStopHandler() {
    mediaRecorder.stop();
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
        onClick={() => {
          if (!flag) {
            voiceStartHandler();
          } else {
            voiceStopHandler();
          }
          setFlag(!flag);
        }}
      >
        <div
          style={{
            background: "red",
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          {flag ? (
            <MicSharp fontSize="large" />
          ) : (
            <MicNoneRounded fontSize="large" />
          )}
        </div>
      </div>
      <div>
        <Button
          color="secondary"
          onClick={() => {
            if (!flag) {
              voiceStartHandler();
            } else {
              voiceStopHandler();
            }

            setFlag(!flag);
          }}
        >
          {flag ? "Stop" : "Start"}
        </Button>
      </div>
    </>
  );
};

export default VoiceUploader;