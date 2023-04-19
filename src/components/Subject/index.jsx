import React from "react";
import { useEffect , useState } from "react";
import Toolbar from "../Toolbar/Toolbar";
import Navbar from '../Navbar';
import style from "./Subject.module.css";
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';

function Subjects() {
    
    const [subjects, setSubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
            .then((response) => response.json())
            .then((data) => {
                const simplifiedData = data.results.map((subject) => {
                return { asignatura_codigo: subject.id, asignatura_nombre: subject.name, programa_titulo: subject.gender };
                });
                setSubjects(simplifiedData);
            });
    }, []);

    const filteredSubjects = subjects.filter((subject) =>
        subject.asignatura_nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
        <><Toolbar />
        <div className={style.containerSubject}>
            <div className={style.searchBar}>
                <div className={style.search}>
                    <SearchIcon />
                    <input 
                        className="bar" 
                        type="text" 
                        placeholder="Ingresa el nombre de la asignatura" 
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>
            </div>
            <div className={style.grid}>
                {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((item, index) => (
                        <div key={index} className={style.card}>
                            <div className={style.tittle}>
                                <h4>{item.asignatura_nombre}</h4>
                                <p>{item.programa_titulo}</p>
                            </div>
                            <div className={style.body}>
                                <p></p>
                            </div>
                            <div className={style.buttons}>
                                <button className="state">ESTADO DE LA ASIGNATURA</button>
                                <Link to={'/TabComponent/'+ item.asignatura_codigo}>
                                    <button className="manage" >GESTIONAR ASIGNATURA</button>
                                </Link>
                            </div>
                        </div>
                    ))
                ):(
                    <h4>No encontrado</h4>
                )}
            </div>
        </div>
        <Navbar /></>
    );
  }
  
  export default Subjects;