import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useFileUpload } from "@/app/hooks/lib/uploadImage";

const VoiceUploader = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [flag, setFlag] = useState(false);
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
        const blob = new Blob(chunks, { type: "audio/wav" });
        const file = new File([blob], "file.wav", { type: "audio/wav" });

        let uploadOk = await uploadFile("file.wav", file);
      };
    }

    handling();
  }, [mediaRecorder]);

  function voiceStartHandler() {
    let mediaRecorder;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setMediaRecorder(mediaRecorder);
    });
  }

  function voiceStopHandler() {
    mediaRecorder.stop();
  }

  return (
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
  );
};

export default VoiceUploader;
