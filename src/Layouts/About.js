import React from "react";
import AboutHeader from "../Components/About/AboutHeader";
import AboutButton from "../Elements/About/AboutButton";
import AboutHeadline from "../Elements/About/AboutHeadline";
import AboutQuestionTitle from "../Elements/About/AboutQuestionTitle";
import AboutQuestionAnswer from "../Elements/About/AboutQuestionAnswer";
import AboutImg from "../Elements/About/AboutImg";
import { RiInstagramLine, RiLinkedinBoxFill, RiMailLine } from "react-icons/ri";

function About({ uiState, setUiState }) {
    // Definição das perguntas e respostas
    let questionOne = "Desperte seu melhor!";
    let answerOne =
        "Neuroacustic Vibes proporciona uma experiência auditiva maravilhosa, conectando mente e som em uma sinergia única.";
    let questionTwo = "Explore o Universo Sonoro de Neuroacustic Vibes";
    let answerTwo =
        "Imersa em cada nota, a experiência das Neuroacustic Vibes transcende o ordinário, levando-nos a um universo sonoro de emoções e sensações. Cada acorde é um convite ao mergulho profundo na música, onde os sentidos se entrelaçam em uma dança harmônica, alimentando a alma com sua magia sonora. Permita-se ser envolvido por essa jornada auditiva extraordinária e descubra um novo mundo de prazer e contemplação.";

    return (
        <div className={`about ${uiState.aboutShown ? "" : "about--hidden"}`}>
            {/* Componente do cabeçalho */}
            <AboutHeader uiState={uiState} setUiState={setUiState} />
            <div className="about__wrapper">
                {/* Grupo sobre o conteúdo principal */}
                <div className="about-group">
                    <p>Olá bem vindo(a)</p>
                    {/* Componente de título principal */}
                    <AboutHeadline content="Dê o play na sua energia" />
                </div>
                {/* Componente de imagem */}
                <AboutImg />
                {/* Grupos de perguntas e respostas */}
                <div className="about-group">
                    <AboutQuestionTitle content={questionOne} />
                    <AboutQuestionAnswer content={answerOne} />
                </div>
                <div className="about-group">
                    <AboutQuestionTitle content={questionTwo} />
                    <AboutQuestionAnswer content={answerTwo} />
                </div>

                <hr />

                {/* Segundo título */}
                <div className="about-group">
                    <p>Acesse nossos canais e</p>
                    {/* Componente de título */}
                    <AboutHeadline content="Inscreva-se" />
                </div>

                {/* Links para redes sociais */}
                <div className="about-socials">
                    <div className="about-socials-group">
                        <RiInstagramLine className="about-socials-icon" />
                        <p className="about-socials-text">@biancaenricone</p>
                    </div>
                    <div className="about-socials-group">
                        <RiLinkedinBoxFill className="about-socials-icon" />
                        <p className="about-socials-text">
                            /in/bianca-enricone
                        </p>
                    </div>
                    <div className="about-socials-group">
                        <RiMailLine className="about-socials-icon" />
                        <p className="about-socials-text">
                            @gmail.com
                        </p>
                    </div>
                </div>

                <hr />
                {/* Terceiro título */}
                <div className="about-group">
                    <p>Curta seu momento e desperte sua melhor versão!</p>
                    {/* Componente de título */}
                    <AboutHeadline content="Neuroacustic Vibes - Energy" />
                </div>
                {/* Botão do portfólio 
                <AboutButton />*/}
            </div>
        </div>
    );
}

export default About;
