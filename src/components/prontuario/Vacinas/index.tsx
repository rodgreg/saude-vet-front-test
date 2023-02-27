import React from 'react';
import { Calendarutil } from '../../utils/Calendarutil';
import './vacinas.css';


export function Vacinas() {
    return (
        <div className='vacina-conteiner'>
            <div className='vacina-table'>
                <h2>Vacinas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Vacina</th>
                            <th>Dose</th>
                            <th>Programada para</th>
                            <th>Aplicada em</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Vacina</td>
                            <td>1 ml</td>
                            <td>12/03/2023</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Vacina 2</td>
                            <td>0.05 ml</td>
                            <td>23/03/2023</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='vacina-calendar'>
                <Calendarutil />
            </div>
        </div>
    )
}