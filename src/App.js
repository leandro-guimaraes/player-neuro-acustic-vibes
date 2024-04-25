import React, { useRef, useState } from "react";
import "./Styles/app.scss"; // Estilos SCSS da aplicação
import MenuHeader from "./Components/Common/MenuHeader"; // Componente do cabeçalho do menu
import Artwork from "./Elements/Main/Artwork"; // Componente de arte
import SongInfo from "./Components/Main/SongInfo"; // Componente de informações da música
import Player from "./Components/PlayerInterface/Player"; // Componente do player
import Library from "./Layouts/Library"; // Componente da biblioteca
import About from "./Layouts/About"; // Componente "Sobre"
import songData from "./Data/SongData"; // Dados das músicas

function App() {
    // Detectar se o usuário tem o modo escuro ativado
    let userDarkModeApplied = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    // Estado dos componentes de UI
    const [uiState, setUiState] = useState({
        aboutShown: false, // Indica se o componente "Sobre" está sendo mostrado
        libraryShown: false, // Indica se a biblioteca está sendo mostrada
        libraryPinned: false, // Indica se a biblioteca está fixada
        darkMode: userDarkModeApplied ? true : false, // Indica se o modo escuro está ativado
        coverSpinning: false, // Indica se a capa do álbum está girando
        songPlaying: false, // Indica se uma música está sendo reproduzida
        seekWidth: 0, // Largura do controle de busca
    });

    // Estado das músicas
    const [songState, setSongState] = useState({
        currentSong: [songData[0]], // Música atualmente reproduzida
        isPlaying: false, // Indica se a música está sendo reproduzida
        elapsed: 0, // Tempo decorrido da música
        duration: 0, // Duração total da música
    });

    // Referência para o elemento de áudio
    const audioRef = useRef(null);

    // Definir o fundo como a capa do álbum
    document.body.style.backgroundImage = `url('${songState.currentSong[0].coverUrl}')`;

    // Função chamada quando a música termina
    const songEndHandler = async () => {
        let currentIndex = songData.findIndex(
            (song) => song === songState.currentSong[0]
        );
        await setSongState({
            ...songState,
            currentSong: [songData[(currentIndex + 1) % songData.length]],
        });
        audioRef.current.play();
    };

    // Função para lidar com informações da música
    const songInfoHandler = (e) => {
        const elapsed = e.target.currentTime;
        const duration = e.target.duration;
        setSongState({
            ...songState,
            duration: duration,
            elapsed: elapsed,
        });
    };

    return (
        <div
            className={`app__wrapper ${
                uiState.darkMode ? "dark-mode" : "light-mode"
            }`}
            style={{
                backdropFilter: `${
                    uiState.libraryShown || uiState.aboutShown
                        ? "none"
                        : "blur(1.5rem)"
                }`,
                WebkitBackdropFilter: `${
                    uiState.libraryShown || uiState.aboutShown
                        ? "none"
                        : "blur(1.5rem)"
                }`,
            }}
        >
            {/* O cabeçalho do menu apenas exibe as opções do menu */}
            {/* Ele só precisa de acesso a isNavMenuShown e setNavMenuShown */}
            <MenuHeader uiState={uiState} setUiState={setUiState} />
            <Artwork uiState={uiState} songState={songState} />
            <SongInfo songState={songState} />
            <Player
                uiState={uiState}
                setUiState={setUiState}
                audioRef={audioRef}
                songState={songState}
                setSongState={setSongState}
            />
            <Library
                uiState={uiState}
                setUiState={setUiState}
                songState={songState}
                setSongState={setSongState}
                songData={songData}
                audioRef={audioRef}
            />
            <About uiState={uiState} setUiState={setUiState} />
            <audio
                ref={audioRef}
                src={songState.currentSong[0].audio}
                onTimeUpdate={songInfoHandler}
                onLoadedMetadata={songInfoHandler}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
}

export default App;
