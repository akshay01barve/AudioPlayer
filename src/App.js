import React, { useState, useEffect } from 'react';
import AudioPlayer from './Components/AudioPlayer';

const initialAudioFiles = JSON.parse(localStorage.getItem('audioList')) || [
  { name: 'Dummyaudio', url: 'Hello Honey Bunny (Full Song).mp3' },
  // Add more initial audio files as needed
];

const App = () => {
  const [audioUpload, setAudioUpload] = useState('');
  const [audioFiles, setAudioFiles] = useState(initialAudioFiles);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(
    parseInt(localStorage.getItem('currentAudioIndex')) || 0
  );

  const [selectedAudioUrl, setSelectedAudioUrl] = useState('');

  useEffect(() => {
    // Update the selected audio URL when the currentAudioIndex changes
    setSelectedAudioUrl(audioFiles[currentAudioIndex]?.url || '');
  }, [currentAudioIndex, audioFiles]);

  const uploadAudioHandler = () => {
    if (audioUpload === '') return;
    const data = new FormData();
    data.append('file', audioUpload);
    data.append('upload_preset', 'm4q6li6c');
    data.append('cloud_name', 'dgnrwqixw');
    data.append('api_key', '');
    data.append('api_secret', '');
    data.append('resource_type', 'audio');

    fetch('https://api.cloudinary.com/v1_1/dgnrwqixw/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const newAudioFiles = [...audioFiles, { name: data.original_filename, url: data.url }];
        setAudioFiles(newAudioFiles);
        localStorage.setItem('audioList', JSON.stringify(newAudioFiles));
        // No need to reload the whole window, just update the state
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ backgroundColor: '#0ea5e9', padding: '50px' }}>
      <h1 style={{ textAlign: 'center', color: '#fefefe' }}>Audio Player</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          border: '1px solid black',
          padding: '5px',
        }}
      >
        <div>
          <h2 style={{ textAlign: 'center', color: '#fefefe' }}>Please Select a Song and Upload it </h2>
          <div>
            <input type='file' onChange={(e) => setAudioUpload(e.target.files[0])} />
            <button onClick={uploadAudioHandler}>Upload Audio</button>
          </div>
          <AudioPlayer
            audioFiles={audioFiles}
            currentAudioIndex={currentAudioIndex}
            setCurrentAudioIndex={setCurrentAudioIndex}
            selectedAudioUrl={selectedAudioUrl} // Pass the selected audio URL to AudioPlayer
          />
        </div>

        <div>
          <h1>Please select which song you want to play</h1>
          
         <div style={{border:"1px solid" }}>
         <h3 style={{textAlign:"center",color:"#fefefe"}}>Playlist</h3>
         <ul>
            {audioFiles.map((audio, index) => (
              <li key={index} onClick={() => setCurrentAudioIndex(index)} style={{cursor:'pointer',textDecoration:"underline", }}>
                {audio.name}{' '}
              </li>
            ))}
          </ul>
         </div>
        </div>
      </div>
    </div>
  );
};

export default App;


