import { useState } from "react";
import { ControleEditora } from "./controle/ControleEditora";
import { ControleLivros } from "./controle/ControleLivro";
import { useNavigate } from "react-router-dom";

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados = () => {
  const opcoes = controleEditora.getEditoras().map(editora => ({ value: editora.codEditora, text: editora.nome }));
 
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);
  
  const navigate = useNavigate();

  const tratarCombo = (evento) => {
    const selectedValue = evento.target.value;

    setCodEditora(Number(selectedValue));
  };

  const incluir = (evento) => {
    evento.preventDefault();

    const newLivro = {
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora,
    };

    controleLivro.incluir(newLivro);

    navigate('/');
  };
  return (
    <main className="container">
      <h1>Inclusão de Livro</h1>

      <form onSubmit={incluir}>
        <div className="form-group">
          <label htmlFor="tituloInput">Título:</label>
          <input type="text" className="form-control" id="tituloInput" required name="titulo" onChange={e => setTitulo(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="resumoTextarea">Resumo:</label>
          <textarea className="form-control" id="resumoTextarea" name="resumo" onChange={e => setResumo(e.target.value)}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="editoraSelect">Editora:</label>
          <select className="form-control" id="editoraSelect" required name="codEditora">
            <option value="Selecione uma editora" disabled selected>Selecione uma editora</option>
            {opcoes.map((opcao, index) => <option key={index} value={opcao.value} onChange={e => tratarCombo(e)}>{opcao.text}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="autoresTextarea">Autores:</label>
          <textarea className="form-control" id="autoresTextarea" name="autoresForm" onChange={e => setAutores(e.target.value)}></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Incluir</button>
      </form>
    </main>
  );
};

export default LivroDados;