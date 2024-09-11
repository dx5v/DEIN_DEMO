import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveformPlayer = () => {
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const waveformRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(0);

  useEffect(() => {
    if (waveformRef.current && !waveSurfer) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#999',
        progressColor: '#555',
        cursorColor: '#333',
        height: 50,
        responsive: true,
      });
      setWaveSurfer(ws);
    }
  }, [waveformRef, waveSurfer]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(URL.createObjectURL(file));
      if (waveSurfer) {
        waveSurfer.load(URL.createObjectURL(file));
      }
    }
  };

  const playAudio = () => {
    if (waveSurfer) {
      waveSurfer.playPause();
    }
  };

  const handleZoomChange = (e) => {
    const zoomValue = Number(e.target.value);
    setZoomLevel(zoomValue);
    waveSurfer.zoom(zoomValue);
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <div ref={waveformRef} style={{ width: '100%', height: '100px' }}></div>
      <div>
        <button onClick={playAudio}>Play / Pause</button>
      </div>
      <div>
        <label htmlFor="zoomRange">Zoom: </label>
        <input
          id="zoomRange"
          type="range"
          min="0"
          max="200"
          value={zoomLevel}
          onChange={handleZoomChange}
        />
      </div>
    </div>
  );
};

export default WaveformPlayer;
